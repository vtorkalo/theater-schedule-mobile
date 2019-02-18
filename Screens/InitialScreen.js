import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { storeSettings } from '../Actions/settingsActions';
import { connect } from 'react-redux';
import { setLanguage } from 'redux-i18n';

class InitialScreen extends Component {
    SetLang = (code) => {
        this.props.storeSettings(this.props.deviceId, { languageCode: code });
        this.props.setLanguage(code);
        this.props.navigation.navigate("drawerStack");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageBox}>
                    <Image
                        style={{ height: 300, width: '100%' }}
                        source={require('../img/puppet.png')}
                    />
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity onPress={() => this.SetLang("en")} style={styles.myButton}>
                        <Text style={styles.textContainer}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.SetLang("uk")} style={styles.myButton}>
                        <Text style={styles.textContainer}>Українська</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.SetLang("ru")} style={styles.myButton}>
                        <Text style={styles.textContainer}>Русский</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#b6a2e3',
    },
    imageBox: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    buttonBox: {
        margin: 10,
        marginBottom: 45,
        flex: 2,
        justifyContent: "center",
        alignItems: "center",

    },
    myButton: {
        width: "70%",
        color: "white",
        backgroundColor: "#5b3bab",
        alignItems: "center",
        margin: 1,
        justifyContent: "center",
        flex: 1 / 3,
        borderRadius: 4,
    },
    textContainer: {
        color: "white",
        fontSize: 25
    }


});
const mapStateToProps = (state) => {
    return {
        deviceId: state.settings.deviceId
    };
}

const mapDispatchToProps = {
    storeSettings,
    setLanguage,
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
