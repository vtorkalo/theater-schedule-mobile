import React from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loadPerformance } from '../Actions/PerformanceCreator';
import LocalizeComponent from "../Localization/LocalizedComponent";
import { BallIndicator } from 'react-native-indicators';
import { SaveOrDeletePerformance } from 'TheaterSchedule/Actions/WishListActions/WishListActionCreators';
import { changeStatusPerformance } from 'TheaterSchedule/Actions/PerformanceCreator';
import { getTeamMembers } from "../Selectors/CreativeTeamMembersSelector";
import { Card, CardItem, Left, Body, Thumbnail, List } from 'native-base';
import ImageGallery from './PerformanceDetailsComponents/ImageGallery';
import { isBase64 } from 'is-base64';
import _ from 'lodash';

class PerformanceScreen extends LocalizeComponent {
    componentDidMount() {
        this.props.loadPerformance(this.props.deviceId, this.props.navigation.getParam('performance', 'NO-ID'), this.props.languageCode);
    };

    toggleWishlist = (performanceId) => {
        this.props.SaveOrDeletePerformance(this.props.deviceId, performanceId);
        this.props.changeStatusPerformance(this.props.isChecked);
    }

    render() {
        const performanceId = this.props.navigation.getParam('performance', 'NO-ID');
        if ((this.props.isLoading) || (!this.props.performance)) {

            return (
                <Container style={styles.container}>
                    <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <BallIndicator color="#aaa" />
                    </Content>
                </Container>
            );
        } else {
            let base64Image = isBase64(this.props.performance.mainImage)
                ? `data:image/png;base64,${this.props.performance.mainImage}`
                : this.props.performance.mainImage;

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
                                <TouchableOpacity onPress={() => this.toggleWishlist(performanceId)}>
                                    <View style={styles.detailsButton}>
                                        {this.props.isChecked ?
                                            <Text style={styles.buttonText}>{this.t("Remove from favourites")}</Text> :
                                            <Text style={styles.buttonText}>{this.t("Add to favourites")}</Text>}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textContainer} >
                                <Text style={styles.textSubtitle}>{this.t("AUTHOR")}:</Text>
                                <Text style={styles.testStyle}>{this.props.Authors}</Text>
                                <Text style={styles.textSubtitle}>{this.t("PRODUCER")}:</Text>
                                <Text style={styles.testStyle}>{this.props.Producers}</Text>
                                <Text style={styles.textSubtitle}>{this.t("PAINTER")}:</Text>
                                <Text style={styles.testStyle}>{this.props.Painters}</Text>
                                <Text style={styles.textSubtitle}>{this.t("COMPOSER")}:</Text>
                                <Text style={styles.testStyle}>{this.props.Composers}</Text>
                                <Text style={styles.textSubtitle}>{this.t("description")}</Text>
                                <Text style={styles.testStyle}>{this.props.performance.description}</Text>
                                <Text style={styles.textSubtitle}>{this.t("price")}</Text>
                                <Text style={styles.testStyle}>{this.props.performance.minPrice} - {this.props.performance.maxPrice}</Text>
                                <Text style={styles.textSubtitle}>{this.t("hashtags")}:</Text>
                                <Text style={styles.testStyle}>{_.join(this.props.performance.hashTag, ', ')}</Text>
                                {/* <View style={{ marginBottom: 10 }} /> */}
                            </View>

                            <View style={{ flex: 1, marginBottom: 25 }}>
                                <ImageGallery
                                    images={this.props.performance.galleryImage}
                                    galleryTitle={this.t("Performance Image Gallery: ")}
                                    keyExtractor={(item) => item.uri}
                                    showImage={({ item }) =>
                                        <View style={styles.cardContainer}>
                                            <Card style={styles.card}>
                                                <CardItem>
                                                    <Left>
                                                        <Thumbnail source={require('../img/puppet1.png')} />
                                                        <Body>
                                                            <Text style={{ fontSize: 18 }}>{this.props.performance.title}</Text>
                                                            <Text note style={{ fontStyle: 'italic' }}>{this.t("Lviv Puppet Theater")}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                                <CardItem cardBody>
                                                    <Image source={{ uri: `${item}` }} style={styles.galleryImage} />
                                                </CardItem>
                                                <CardItem>
                                                </CardItem>
                                            </Card>
                                        </View>
                                    }
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
        backgroundColor: '#BFD0D670'
    },
    cardContainer: {
        marginVertical: 10,
        marginHorizontal: 5,
        shadowColor: '#1a1917',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 5
    },
    card: {
        minHeight: 300,
        minWidth: 300,
    },
    galleryImage: {
        height: 200,
        width: null,
        flex: 1,
        resizeMode: 'cover'
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
        width: Dimensions.get('window').width * 0.6,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    }
});

const mapStateToProps = (state) => {

    const { Authors, Composers, Producers, Painters } = getTeamMembers(state.performanceReducer.performance.teamMember);
    return {
        languageCode: state.settings.settings.languageCode,
        performance: state.performanceReducer.performance,
        isLoading: state.performanceReducer.loading,
        Authors,
        Producers,
        Composers,
        Painters,
        deviceId: state.settings.deviceId,
        isChecked: state.performanceReducer.isChecked,
    }
}

const mapDispatchToProps = {
    loadPerformance,
    SaveOrDeletePerformance,
    changeStatusPerformance,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceScreen);
