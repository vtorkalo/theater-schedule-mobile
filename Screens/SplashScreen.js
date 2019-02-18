import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';

class SplashScreen extends Component {
    componentDidUpdate() {
        if (this.props.isAppReady) {
            if (this.props.isLoggedIn) {
                this.navigateTo("drawerStack");
            }
            else {
                this.navigateTo("ChooseLanguage");
            }
        }
    }

    navigateTo(screenName) {
        let key = null;
        console.log(key, screenName);
        const resetAction = StackActions.reset({
            index: 0,
            key: key,
            actions: [NavigationActions.navigate({screenName})]
        });
        this.props.navigation.dispatch(resetAction);
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

export default connect(mapStateToProps)(SplashScreen);
