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
import { getData } from "../Actions/StreamActions/StreamActionCreator"

class StreamScreen extends LocalizeComponent {
    state = {
        connection: false,
        url: 'https://www.google.com/',
    };

    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name="play" size={25} />),
            title: screenProps.StreamScreenTitle,
        };
    };

    async componentDidMount() {
        await this.checkInternt();
        await this.props.fetchAllPerformances(BASE_URL + 'api/performance');
        await this.checkInternt();
    }


    checkInternt = () => {
        Linking.canOpenURL(this.state.url).then(connection => {
            if (!connection) {
                this.setState({ connection: false });
            } else {
                fetch(this.state.url).then(res =>
                    this.setState({ connection: res.status !== 200 ? false : true })
                );
            }
        });
    };




    render() {
        if (this.props.hasErrored)

            return (<View style={styles.container}>
            </View>)
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
                                {this.props.isListEmpty
                                    ? null
                                    : <PerformanceList navigation={this.props.navigation} />}
                            </View>
                        </Content>
                    </ImageBackground>
                </Container>
            );
        }
        else {
            return (<Container style={{ flex: 1 }}>
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
        fetchAllPerformances: (url) => dispatch(getData(url))
    };
}
const mapStateToProps = (state) => {

    return {
        isLoading: state.streamReducer.isFetching,
        isListEmpty: state.streamReducer.performances.length == 0,
        hasErrored: state.streamReducer.hasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamScreen)