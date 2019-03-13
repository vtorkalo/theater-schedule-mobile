import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changeScreen, } from '../Actions/AppActions/AppActionCreators';

class SplashScreen extends Component {
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

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../img/puppet.png')}
                />
            </View>
        );
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
    }
}

const mapDispatchToProps = {
    changeScreen,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
