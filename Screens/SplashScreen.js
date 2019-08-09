import React, { Component } from 'react';
import { View, Image, StyleSheet, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { changeScreen, } from '../Actions/AppActions/AppActionCreators';
import UniformButton from './Components/UniformButton';
import { Toast } from 'native-base';

class SplashScreen extends Component {

    state = {connectionType: ""}

    componentDidMount(){
        NetInfo.getConnectionInfo().then((connectionIfno)=> {this.setState({connectionType:connectionIfno.type})})

        setTimeout(() => {
        }, 3000)
    }

    componentDidUpdate() {
        if (this.props.isAppReady) {
            if (this.props.isLoggedIn) {
                this.props.changeScreen("drawerStack")
            }
            else {
                this.props.changeScreen("ChooseLanguage");
            }
        }
    }

    combineFunction() {
        this.props.navigation.navigate("Stream")
    }



    render() {       
        if (this.props.isTimeOut == true){
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('../img/puppet.png')}
                    />
                </View>

            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('../img/puppet.png')}
                    />
                    <UniformButton text="Go to dubbing" style={{
                        alignSelf: "center",
                        margin: 20,
                        width: "65%",
                        justifyContent: 'center',
                        marginTop: 8
                    }}
                        onPress={() => this.combineFunction()}
                    />
                    
                </View>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b6a2e3',
    },
    image: {
        height: 300,
        width: '100%',
    }
});

const mapStateToProps = state => {
    return {
        isAppReady: state.defaultReducer.isAppReady,
        isLoggedIn: state.defaultReducer.isLoggedIn,
        isTimeOut: state.settings.isTimeOut,
    }
}

const mapDispatchToProps = {
    changeScreen,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
