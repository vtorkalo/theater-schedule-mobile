import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Content } from 'native-base';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loadPerformance } from '../Actions/PerformanceCreator';
import LocalizeComponent from "../Localization/LocalizedComponent";
import { BallIndicator } from 'react-native-indicators';
import { SaveOrDeletePerformance } from 'TheaterSchedule/Actions/WishListActions/WishListActionCreators';
import { changeStatusPerformance, setStatusPerformance } from 'TheaterSchedule/Actions/PerformanceCreator';


class PerformanceScreen extends LocalizeComponent { 
    constructor(props) {
        super(props);

        this.state = { performanceId: this.props.navigation.getParam('performance', 'NO-ID')};
    }

    componentDidMount() {
        this.props.loadPerformance(this.props.deviceId, this.state.performanceId, this.props.languageCode); 
    };

    toggleWishlist = (deviceId,performanceId) => {       
            this.props.SaveOrDeletePerformance(deviceId, performanceId);
            this.props.changeStatusPerformance(this.props.isChecked);
    }

    render() {
        if (this.props.isLoading) {
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
            return (

                <Container>
                    <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <ScrollView>

                            <View style={styles.imageContainer} >
                                <Image
                                    style={styles.image}
                                    resizeMode='contain'
                                    source={{ uri: base64Image }}
                                />
                            </View>
                                <View style={styles.textContainer} >
                                    <Text style={styles.textTitle} >{this.props.performance.title} ({this.props.performance.minimumAge}+)</Text>
                                </View>

                                <View style={styles.ButtonContainer} >
                                    <TouchableOpacity onPress={() => this.toggleWishlist(this.props.deviceId,this.state.performanceId)}>
                                        <View style={styles.detailsButton}>
                                            {this.props.isChecked? 
                                              <Text style={styles.buttonText}>{this.t("Remove from favourites")}</Text>:
                                              <Text style={styles.buttonText}>{this.t("Add to favourites")}</Text>}                  
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.textContainer} >
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
        marginLeft: 10,
        marginRight: 10,
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    detailsButton: {
        marginBottom: 5,
        backgroundColor: '#7154b8',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 5,
        width: Dimensions.get('window').width * 0.5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    }
});

const mapStateToProps = state => {
    return {
        languageCode: state.settings.settings.languageCode,
        performanceId: state.scheduleReducer.performanceId,
        performance: state.performanceReducer.performance,
        isLoading: state.performanceReducer.loading,
        deviceId: state.settings.deviceId,
        isChecked: state.performanceReducer.isChecked,
    }
}

const mapDispatchToProps = {
    loadPerformance,
    SaveOrDeletePerformance,
    changeStatusPerformance,
    setStatusPerformance
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceScreen);

