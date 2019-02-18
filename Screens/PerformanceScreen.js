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

class PerformanceScreen extends LocalizeComponent {

    componentWillMount() {
        //        this.props.loadPerformance(this.props.navigation.getParam('performance', 'NO-ID'), this.props.languageCode);
        this.props.loadPerformance(1, "en");
    };
    state = {
        images: [
            {
                URL: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg",
                index: 1,
                title: "sometext",
                description: "sometext asdasdasdas",
            },
            {
                URL: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg",
                index: 2,
                title: "sometext",
                description: "sometext asdasdasdas",
            },
            {
                URL: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg",
                index: 3,
                title: "sometext",
                description: "sometext asdasdasdas",
            },
            {
                URL: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg",
                index: 4,
                title: "sometext",
                description: "sometext asdasdasdas",
            },
        ]
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
                            {/* <ImageBrowser images={imageURLs} /> */}
                            <View style={{backgroundColor:"#BFD0D6"}}>
                                <ImageLayout
                                    imageContainerStyle={{ height: 100 }}
                                    columns={2}
                                    images={[
                                        { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg", },
                                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg", },
                                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg", },
                                        { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg", },
                                        // { uri: "https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg", },
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

