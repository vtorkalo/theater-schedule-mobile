import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loadPerformance } from '../Actions/PerformanceCreator';
import LocalizeComponent from "../Localization/LocalizedComponent";

class PerformanceScreen extends LocalizeComponent {

    componentWillMount() {
        this.props.loadPerformance(this.props.performanceId, this.props.languageCode);

    };

    render() {
        let base64Image = `data:image/png;base64,${this.props.performance.mainImage}`;
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
                                <Text style={styles.textSubtitle}>{this.t("actors")}:</Text>
                                <Text style={styles.testStyle}>{this.t("Andrii Mudrak")}, {this.t("Taras Tymchuk")}</Text>
                                <Text style={styles.textSubtitle}>{this.t("description")}</Text>
                                <Text style={styles.testStyle}>{this.props.performance.description}</Text>
                                <Text style={styles.textSubtitle}>{this.t("price")}</Text>
                                <Text style={styles.testStyle}>{this.props.performance.minPrice} - {this.props.performance.maxPrice}</Text>
                                <Text style={styles.textSubtitle}>{this.t("hashtags")}:</Text>
                                <Text style={styles.testStyle}>{this.props.performance.hashTag}</Text>
                                <View style={{ marginBottom: 10 }} />

                            </View>
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        )
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

    }
}

const mapDispatchToProps = {
    loadPerformance,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceScreen);

