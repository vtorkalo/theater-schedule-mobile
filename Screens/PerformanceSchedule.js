import React from 'react';
import LocalizedComponent from '../Localization/LocalizedComponent';
import { NavigationActions } from 'react-navigation';
import { Text, FlatList, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import { Container, Content, View } from 'native-base';
import { fetchSchedule } from '../Actions/performanceScheduleActions';
import { connect } from 'react-redux';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { BallIndicator } from 'react-native-indicators';
import ScheduleItem from './PerformanceScheduleComponents/ScheduleItem';

class PerformanceSchedule extends LocalizedComponent {

    componentDidMount() {
        this.props.fetchSchedule(this.props.navigation.getParam('performance', 'NO-ID'));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.languageCode !== this.props.languageCode) {
            this.props.fetchSchedule(this.props.navigation.getParam('performance', 'NO-ID'));
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Container style={{ flex: 1 }}>
                    <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <BallIndicator color="#aaa" />
                    </Content>
                </Container>
            );
        }
        else {
            if(this.props.schedule.scheduleList==null || !this.props.schedule.scheduleList.length)
            {
                return(
                    <Container>
                        <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                        <Content style={styles.contentContainer}>
                            <View style={styles.mainContainer}>
                                <View style={styles.backgroundContainer}>
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={{ uri: this.props.schedule.mainImage }} />
                                </View>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{this.props.schedule.title}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.detailName}>{this.t("Duration")}</Text>
                                    <Text style={styles.detailValue}>{this.props.schedule.duration + this.t("min")}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.detailName}>{this.t("Cost")}</Text>
                                    <Text style={styles.detailValue}>{this.props.schedule.price + this.t("uah")}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.detailName}>{this.t("Age")}</Text>
                                    <Text style={styles.detailValue}>{this.props.schedule.age + "+"}</Text>
                                </View>
                            </View>
                            <View style={styles.errorMesageContainer}>
                                <Text style={styles.errorMessage}>{this.t("No performance schedule")}</Text>
                            </View>
                        </Content>
                    </Container>
                );
            }
            else{
                return (
                    <Container>
                        <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                        <Content style={styles.contentContainer}>
                            <View style={styles.mainContainer}>
                                <View style={styles.backgroundContainer}>
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.image} source={{ uri: this.props.schedule.mainImage }} />
                                </View>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{this.props.schedule.title}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.detailName}>{this.t("Duration")}</Text>
                                    <Text style={styles.detailValue}>{this.props.schedule.duration} {this.t("min")}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.detailName}>{this.t("Cost")}</Text>
                                    <Text style={styles.detailValue}>{this.props.schedule.price} {this.t("uah")}</Text>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.detailName}>{this.t("Age")}</Text>
                                    <Text style={styles.detailValue}>{this.props.schedule.age + "+"}</Text>
                                </View>
                            </View>
                            <ScrollView>
                                <View style={{ flex: 1, backgroundColor: '#F5F5F5', marginHorizontal: 7 }}>
                                    <FlatList
                                        data={this.props.schedule.scheduleList}
                                        keyExtractor={(item) => item.day.toString()}
                                        renderItem={({ item }) => <ScheduleItem data={item} />}
                                    />
                                </View>
                            </ScrollView>
                        </Content>
                    </Container>
                );
            }
            
        }
    }
}

const { height: viewportHeight } = Dimensions.get('window');
const imageContainerHeight = viewportHeight * 0.28;//0.24
const imageHeight = viewportHeight * 0.32;
const imageWidth = viewportHeight * 0.25;
const HALF_OF_WINDOW_HEIGHT = Dimensions.get('window').height * 0.34;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor:'#F8F8F8',
    },
    mainContainer: {
        height: HALF_OF_WINDOW_HEIGHT,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    backgroundContainer: {
        height: imageContainerHeight,
        backgroundColor: '#9984d4',
        zIndex: -1,
        width: viewportHeight,
    },
    title: {
        fontSize: 25,
        fontWeight: '500'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: imageHeight,
        width: imageWidth,
        zIndex: 1,
        bottom: imageContainerHeight,
        shadowColor: '#1a1917',
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    image: {
        flex: 1,
        height: null,
        width: null,
    },
    detailsContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal:19,
        marginVertical:12,
    },
    priceContainer: {
        flexDirection: 'column'
    },
    detailName: {
        fontSize:18,
        fontWeight:'200',
    },
    detailValue: {
        fontSize:22,
        fontWeight: '500',
        color: '#5b3fa8', 
    },
    errorMesageContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center', 
        marginHorizontal:19,
    },
    errorMessage: {
        fontSize: 20,
    }
});
const mapStateToProps = state => {
    return {
        schedule: state.performanceSchedule.schedule,
        isLoading: state.performanceSchedule.loading,
    }
}
const mapDispatchToProps = {
    fetchSchedule
}
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceSchedule);