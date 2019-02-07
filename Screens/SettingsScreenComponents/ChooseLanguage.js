import React from 'react';
import { Text, StyleSheet, View, Picker, TouchableOpacity, Alert } from 'react-native';
import DeviceInfo from "react-native-device-info";
import { connect } from 'react-redux';
import { storeSettings } from '../../Actions/settingsActions';
import LocalizeComponent from '../../Localization/LocalizedComponent';

class ChooseLanguage extends LocalizeComponent {
    state = {
        settings: { language: "" }
    }

    componentDidUpdate(prevState) {
        if (!prevState.settings.error && this.props.settings.error) {
            Alert.alert(this.t('Error!'), this.t('Please try again'));
        }
        else if (prevState.settings.loading && !this.props.settings.error) {
            Alert.alert(this.t('Success!'), this.t('Settings saved'));
        }
    }

    onSaveLanguage = () => {
        let deviceId =
            Expo.Constants.appOwnership == "expo"
                ? Expo.Constants.deviceId
                : DeviceInfo.getUniqueID();
        
        this.props.storeSettings(deviceId, this.state.settings);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.t('Set language')}:</Text>
                </View>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.settings.language}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ settings: { language: itemValue } })
                        }>
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="Ukrainian" value="uk" />
                        <Picker.Item label="Russian" value="ru" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onSaveLanguage}>
                    <Text style={styles.buttonText}>{this.t('Save')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        color: '#7154b8',
        marginLeft: 10,
        fontSize: 15,
        marginTop: 15,
    },
    picker: {
        height: 50,
        width: 135
    },
    button: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 225,
        backgroundColor: '#7154b8',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    }
})

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
}

const mapDispatchToProps = {
    storeSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLanguage);
