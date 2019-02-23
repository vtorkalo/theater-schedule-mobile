import React from 'react';
import { Text, StyleSheet, View, Picker, TouchableOpacity, Alert, Modal } from 'react-native';
import { connect } from 'react-redux';
import { storeSettings } from '../../Actions/settingsActions';
import LocalizeComponent from '../../Localization/LocalizedComponent';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import {setLanguage} from "redux-i18n";

class ChooseLanguage extends LocalizeComponent {
    state = {
        settings: { languageCode: this.props.settings.settings.languageCode }
    }

    componentDidUpdate(prevState) {
        if (!prevState.settings.error && this.props.settings.error) {
            this.errorDisplay();
        }
        else if (prevState.settings.loading && !this.props.settings.error) {
            this.successDisplay();
        }
    }

    errorDisplay = () => {
        showMessage({
            message: this.t('Error!'),
            description: this.t('Please try again'),
            type: "danger",
            position: 'center',
            duration: 2500
          });
    }

    successDisplay = () => {
        showMessage({
            message: this.t('Success!'),
            description: this.t('Settings saved'),
            type: "success",
            position: 'center',
            duration: 2500
          });
    }

    onSaveLanguage = () => {
        this.props.storeSettings(this.props.settings.deviceId, this.state.settings);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.t('Set language')}:</Text>
                </View>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.settings.languageCode}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ settings: { languageCode: itemValue } })
                        }>
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="Ukrainian" value="uk" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onSaveLanguage}>
                    <Text style={styles.buttonText}>{this.t('Save')}</Text>
                </TouchableOpacity>
                <FlashMessage/>
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
    storeSettings,
    setLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLanguage);
