import React from 'react';
import { StyleSheet, View, Dimensions, BackHandler, Animated, Easing } from 'react-native';
import { Container } from 'native-base';
import LocalizeComponent from "../Localization/LocalizedComponent";
import { connect } from 'react-redux'
import UniformButton from "../Screens/Components/UniformButton"
import BASE_URL from 'TheaterSchedule/BaseURLDubbing'
import { Audio } from 'expo-av';
import { toogleIsConnect } from "../Actions/StreamActions/StreamActionCreator"
const signalR = require("@aspnet/signalr");
import ReturnMenuIcon from 'TheaterSchedule/Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';
import { Overlay } from 'react-native-maps';


let currentAudioLink;



class StreamConnectingScreen extends LocalizeComponent {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._animatedWave = new Animated.Value(-100);
        this._moveAnimation = new Animated.Value(-50);
        this._moveWomen = new Animated.Value(-50);
        this._moveLeftImage = new Animated.Value(0)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.dispatch(NavigationActions.back());
        return true;
    }





    componentDidMount() {
        Animated.loop(
            Animated.parallel([Animated.sequence([
                Animated.timing(this._animatedWave, {
                    toValue: 100,
                    duration: 6000,
                    useNativeDriver: true,
                }),
                Animated.timing(this._animatedWave, {
                    toValue: -100,
                    duration: 6000,
                    useNativeDriver: true,
                })
            ]),
            Animated.sequence([
                Animated.timing(this._moveAnimation, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                }),
                Animated.timing(this._moveAnimation, {
                    toValue: -50,
                    duration: 5000,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(this._moveWomen, {
                    toValue: 0,
                    duration: 5000,
                    easing: Easing.out(Easing.poly(4)),
                    useNativeDriver: true,
                }),
                Animated.timing(this._moveWomen, {
                    toValue: -50,
                    duration: 5000,
                    easing: Easing.out(Easing.poly(4)),
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(this._moveLeftImage, {
                    toValue: 300,
                    duration: 5000,
                    useNativeDriver: true,
                }),
                Animated.timing(this._moveLeftImage, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                }),
            ]),
            ]),
            {
                iterations: -1
            },

        ).start();

        Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            allowsRecordingIOS: false,

            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false

        });
        this.soundObject = new Audio.Sound();
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <View style={styles.container}>
            
                    <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} style={{
                        position: 'absolute'}} />
                

                    <Animated.Image style={[styles.backgroundImage, { transform: [{ translateX: this._moveAnimation }] }]}
                        source={require("TheaterSchedule/img/StreamImg/img_3.png")}
                    />

                    <Animated.Image style={[styles.image4, { transform: [{ translateX: this._moveAnimation }] }]}
                        source={require("TheaterSchedule/img/StreamImg/img_1.png")}
                    />

                    <Animated.Image style={[styles.leftImage, { transform: [{ translateX: this._moveLeftImage }] }]}
                        source={require("TheaterSchedule/img/StreamImg/img_2.png")}
                    />
                    <Animated.Image style={[styles.wave, { transform: [{ translateX: this._animatedWave }] }]
                    }
                        source={require("TheaterSchedule/img/StreamImg/img_0.png")}
                    />

                    <Animated.Image style={[styles.moveWomen, { transform: [{ translateX: this._moveWomen }] }]}
                        source={require("TheaterSchedule/img/StreamImg/img_37.png")}
                    />
                    <Animated.Image style={[styles.wave, { transform: [{ translateX: this._animatedWave }] }]}
                        source={require("TheaterSchedule/img/StreamImg/img_4.png")}
                    />
                    <View style={{ marginBottom: 100 }}>
                        <UniformButton style={styles.button} text={this.props.isConnected ? "You are connected" : "Connect to stream"}
                            onPress={() => this.connectToHub()} disabled={this.props.isConnected}
                        />
                    </View>
                </View>
            </Container>
        );
    }

    handleMessage(link, time) {
        'use strict';

        switch (link) {
            case 'Start':
                this.startStream();
                break;
            case 'End':
                this.endStream();
                break;
            case 'Resume':
                this.resumeStream();
                break;
            case 'Pause':
                this.pauseStream();
                break;
            case currentAudioLink:
                restartCurrentAudio();
                break;
            default:
                this.playNewAudio(link, time);
                break;
        }
    }



    connectToHub() {
        this.props.Connected(true);
        'use strict';
        this.setState({ isClecked: true })
        const hubUrl = `${BASE_URL}StreamHub`
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .build();
        connection.on("ReceiveMessage", (message, time) => {
            this.handleMessage(message, time);
        });

        connection.start().catch(function (err) {
            return console.error(err.toString());
        });


    }

    async startStream() {
        'use strict';
        try {
            await this.soundObject.loadAsync({ uri: `${BASE_URL}Audio/waiting.mp3` },
                { shouldPlay: true });
        }
        catch (exc) {
            console.log(exc);
        }

    }

    async endStream() {
        await this.soundObject.stopAsync();
        await this.soundObject.unloadAsync();

    }

    async pauseStream() {
        await this.soundObject.pauseAsync();
    }

    async resumeStream() {
        await this.soundObject.playAsync();
    }


    async playNewAudio(link, time) {
        link = `${BASE_URL}audio/${link}_${this.props.langId}.mp3`;
        currentAudioLink = link;

        try {
            if (time !== undefined) {
                time *= 1000;
                await this.soundObject.unloadAsync();
                await this.soundObject.loadAsync({ uri: link },
                    { shouldPlay: true, positionMillis: time });
            }
            else {
                await this.soundObject.unloadAsync();
                await this.soundObject.loadAsync({ uri: link },
                    { shouldPlay: true });
                this.soundObject.playAsync();
            }
        } catch (e) {
            console.log('ERROR Loading Audio', e);
        }
    }
}


const { height: viewportHeight, width: viewprotWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        flex: 1,
        minWidth: "65%",
        position: 'absolute',
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 50
    },
    container: {
        marginTop: 50,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    wave: {
        position: 'absolute',
        width: viewprotWidth * 3,
        height: viewportHeight,
        

    },
    moveWomen: {
        position: 'absolute',
        width: viewprotWidth,
        height: viewportHeight,
        

    },
    backgroundImage: {
        position: 'absolute',
        width: viewprotWidth * 2,
        height: viewportHeight,
       

    },
    leftImage: {

        position: 'absolute',
        width: viewprotWidth * 3,
        height: viewportHeight,
        

    }

})

const mapStateToProps = (state) => {

    return {
        langId: state.streamReducer.choosenLang,
        isConnected: state.streamReducer.isConnected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Connected: (bool) => dispatch(toogleIsConnect(bool))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(StreamConnectingScreen)


