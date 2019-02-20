import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loadPerformance } from '../Actions/PerformanceCreator';
import LocalizeComponent from "../Localization/LocalizedComponent";
import { BallIndicator } from 'react-native-indicators';
import ImageLayout from "react-native-image-layout";

var employeeByRoles = {};

class PerformanceScreen extends LocalizeComponent {

    componentDidMount() {
        this.props.loadPerformance(this.props.navigation.getParam('performance', 'NO-ID'), this.props.languageCode);
    };

    seperateRoles(...roles) {
        roles.forEach(element => {
            this.getPersonToRole(element);
        });
    };

    getPersonToRole(role) {
        var filterByRole = {};
        
        filterByRole[role] = this.props.performance.filter(element => {
            return element.role == role;
        });

        for (element = 0; element < filterByRole[role].length; element++) {
            if (element == 0) {
                employeeByRoles[role] = (filterByRole[role][element].firstName + " " + filterByRole[role][element].lastName);
            }
            else {
                employeeByRoles[role] += ' , ' + (filterByRole[role][element].firstName + " " + filterByRole[role][element].lastName);
            }
        }
    };

    render() {
        if ((this.props.isLoading) || (!this.props.performance.teamMember)) {
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <BallIndicator color="#aaa" />
                    </Content>
                </Container>
            );
        } else {
            let base64Image = `data:image/png;base64,${this.props.performance.mainImage}`;

            this.seperateRoles(this.t("PRODUCER"), this.t("AUTHOR"), this.t("PAINTER"));
            console.log(employeeByRoles);
            return (

                <Container>
                    <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <ScrollView style={styles.genericContainer}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.imageContainer} >
                                    <Image
                                        style={styles.image}
                                        resizeMode='contain'
                                        source={{ uri: base64Image }}
                                    />
                                </View>

                                <View style={styles.textContainer} >
                                    <Text style={styles.textTitle} >{this.props.performance.title} ({this.props.performance.minimumAge}+)</Text>
                                    <Text style={styles.textSubtitle}>{this.t("AUTHOR")}:</Text>
                                    <Text style={styles.testStyle}>{employeeByRoles[this.t("AUTHOR")]} </Text>
                                    <Text style={styles.textSubtitle}>{this.t("PRODUCER")}:</Text>
                                    <Text style={styles.testStyle}>{employeeByRoles[this.t("PRODUCER")]} </Text>
                                    <Text style={styles.textSubtitle}>{this.t("PAINTER")}:</Text>
                                    <Text style={styles.testStyle}>{employeeByRoles[this.t("PAINTER")]} </Text>
                                    <Text style={styles.textSubtitle}>{this.t("description")}</Text>
                                    <Text style={styles.testStyle}>{this.props.performance.description}</Text>
                                    <Text style={styles.textSubtitle}>{this.t("price")}</Text>
                                    <Text style={styles.testStyle}>{this.props.performance.minPrice} - {this.props.performance.maxPrice}</Text>
                                    <Text style={styles.textSubtitle}>{this.t("hashtags")}:</Text>
                                    <Text style={styles.testStyle}>{this.props.performance.hashTag}</Text>
                                    <View style={{ marginBottom: 10 }} />

                                </View>
                            </View>
                            <View style={{ backgroundColor: "#BFD0D6" }}>
                                <ImageLayout
                                    imageContainerStyle={{ height: 100 }}
                                    columns={2}
                                    images={[
                                        { uri: "https://lvivpuppet.com/wp-content/uploads/2019/01/IMG_3200-300x165.jpg" },
                                        { uri: "https://lvivpuppet.com/wp-content/uploads/2019/01/IMG_3196-300x170.jpg", },
                                        { uri: "https://lvivpuppet.com/wp-content/uploads/2019/01/IMG_3184-300x169.jpg", },
                                        { uri: "https://lvivpuppet.com/wp-content/uploads/2019/01/IMG_3178-300x169.jpg", },
                                        { uri: "https://lvivpuppet.com/wp-content/uploads/2019/01/IMG_3165-300x169.jpg", },
                                    ]}
                                />
                            </View>
                        </ScrollView>
                    </Content>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    genericContainer: {
        flex: 1,
        backgroundColor: "#BFD0D6",
    },
    imageContainer: {
        height: Dimensions.get('window').height * 0.6,
        alignItems: "center"
    },
    image: {
        flex: 1, marginTop: 10,
        marginBottom: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: Dimensions.get('window').width * 0.85,
        height: null
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    textSubtitle: {
        fontWeight: "bold",
        color: "gray",
        marginBottom: 5
    },
    testStyle: {
        fontWeight: "300",
        marginBottom: 10,
    },
});

const mapStateToProps = state => {
    return {
        languageCode: state.settings.settings.languageCode,
        performanceId: state.scheduleReducer.performanceId,
        performance: state.performanceReducer.performance,
        isLoading: state.performanceReducer.loading,
    }
}

const mapDispatchToProps = {
    loadPerformance,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceScreen);

