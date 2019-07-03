import React from 'react';
import { StyleSheet, View, Dimensions, BackHandler, ImageBackground } from 'react-native';
import { Container, Content } from 'native-base';
import LocalizeComponent from "../Localization/LocalizedComponent";
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import LanguagesList from './StreamTheaterScreenComponent/LanguagesList'
import BASE_URL from 'TheaterSchedule/BaseURLDubbing'
import { getLanguageData } from "../Actions/StreamActions/StreamActionCreator"
import { BallIndicator } from 'react-native-indicators';
import ReturnMenuIcon from 'TheaterSchedule/Navigation/ReturnMenuIcon';

class StreamLanguageScreen extends LocalizeComponent {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }


    componentDidMount() {
        console.log(BASE_URL + `api/performance/${this.props.performaceId}/languages`);
        this.props.fetchAllLanguages(BASE_URL + `api/performance/${this.props.performaceId}/languages`)
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Container style={{ flex: 1 }}>
                    <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}>
                    <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                    
                    <Content contentContainerStyle={styles.contentContainer} >
                        <View style={styles.indicator}>
                            <BallIndicator color="#aaa" />
                        </View>
                        <View style={styles.backgroundPerformancesContainer}>
                            {this.props.isListEmpty
                                ? null
                                : <LanguagesList navigation={this.props.navigation} />}
                        </View>
                    </Content>
                    </ImageBackground>
                </Container>
            );
        }
        else {
            return (<Container style={{ flex: 1 }}>
                <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}>
                <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                <View style={styles.container}>
                    <LanguagesList navigation={this.props.navigation} />
                </View>
                </ImageBackground>
            </Container>
            );
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
    indicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        zIndex: 10,
    },
    backgroundPerformancesContainer: {
        flex: 12,
        opacity: 0.3,
    },
})




const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllLanguages: (url) => dispatch(getLanguageData(url))
    };
}

const mapStateToProps = (state) => {

    return {
        isLoading: state.streamReducer.isFetching,
        isListEmpty: state.streamReducer.performances.length == 0,
        performaceId: state.streamReducer.choosenPerf
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamLanguageScreen)