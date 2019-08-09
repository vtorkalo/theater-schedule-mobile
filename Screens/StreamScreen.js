import React from 'react';
import { StyleSheet, View, Dimensions, Image, ImageBackground, NetInfo, Linking } from 'react-native';
import { Container, Content, Button } from 'native-base';
import LocalizeComponent from "../Localization/LocalizedComponent";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import UniformButton from "../Screens/Components/UniformButton"
import { BallIndicator } from 'react-native-indicators';
import PerformanceList from './StreamTheaterScreenComponent/PerformanceList'
import BASE_URL from 'TheaterSchedule/BaseURLDubbing'
import { getData, fetchPerfomancesFailure } from "../Actions/StreamActions/StreamActionCreator"
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ListEmpty from '../Screens/ScheduleScreenComponents/ListEmpty';

class StreamScreen extends LocalizeComponent {
    state = {
        connection: false,
    };

    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name="play" size={25} />),
            title: screenProps.StreamScreenTitle,
        };
    };

    async componentDidMount() {
        await this.props.fetchAllPerformances(BASE_URL + 'api/performance');
    }

    combineFunction() {
        this.props.fetchErorr(false);
        //this.setState({ state: this.state })
        this.props.fetchAllPerformances(BASE_URL + 'api/performance');
    }

    render() {
        if (this.props.hasErrored)
            return (
                <Container style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}>
                            <DrawerMenuIcon
                                onPressMenuIcon={() => this.props.navigation.openDrawer()}
                                text={this.t('Stream')} />
                            <FlatList style={styles.performanceList}
                                ListEmptyComponent={<ListEmpty text={this.t("emptyStreamMessage")}
                                />}
                                contentContainerStyle={styles.contentContainer} />
                        </ImageBackground>
                    </View>
                </Container>)
        else if (this.props.isLoading) {
            return (
                <Container style={{ flex: 1 }}>
                    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}>
                        <DrawerMenuIcon
                            onPressMenuIcon={() => this.props.navigation.openDrawer()}
                            text={this.t('Stream')} />
                        <Content contentContainerStyle={styles.contentContainer} >
                            <View style={styles.indicator}>
                                <BallIndicator color="#aaa" />
                            </View>
                            <View style={styles.backgroundPerformancesContainer}>
                                {this.props.ListOfPerf.length == 0
                                    ? null
                                    : <PerformanceList navigation={this.props.navigation} />}
                            </View>
                        </Content>
                    </ImageBackground>
                </Container>
            );
        }
        else {
            return (
                <Container style={{ flex: 1 }}>
                    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}>
                        <DrawerMenuIcon
                            onPressMenuIcon={() => this.props.navigation.openDrawer()}
                            text={this.t('Stream')} />
                        <View style={styles.container}>
                            <PerformanceList navigation={this.props.navigation} />
                        </View>
                    </ImageBackground>
                </Container >);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',

    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#BFD0D670'
    },
    backgroundPerformancesContainer: {
        flex: 12,
        opacity: 0.3,
    },
    contentContainer: {
        flexGrow: 1,
    },
    performanceList: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        zIndex: 10,
    }
})




const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllPerformances: (url) => dispatch(getData(url)),
        fetchErorr: (bool) => dispatch(fetchPerfomancesFailure(bool)),
    };
}
const mapStateToProps = (state) => {

    return {
        isLoading: state.streamReducer.isFetching,
        ListOfPerf: state.streamReducer.performances,
        hasErrored: state.streamReducer.hasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamScreen)