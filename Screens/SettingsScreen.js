import React, { Component } from 'react';
import { Text, StyleSheet, View, Picker, TouchableOpacity, Alert } from 'react-native';
import { Container, Content, StyleProvider } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { storeSettings } from '../Actions/settingsActions';
import DeviceInfo from "react-native-device-info";

class SettingsScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='settings-box' size={25} />
    }

    state = {
        settings: { language: "" }
    }

    componentDidUpdate(prevState) {
        if (!prevState.settings.error && this.props.settings.error) {
            Alert.alert("Error", "Please try again");
        }
        else if (prevState.settings.loading && !this.props.settings.error) {
            Alert.alert("Success", "Setting saved");
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
            <Container>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Settings</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.text}>Set language:</Text>
                    </View>
                    <View style={styles.container}>
                        <Picker
                            selectedValue={this.state.settings.language}
                            style={{ height: 50, width: 135 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ settings: { language: itemValue } })
                            }>
                            <Picker.Item label="English" value="en" />
                            <Picker.Item label="Ukrainian" value="uk" />
                            <Picker.Item label="Russian" value="ru" />
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.onSaveLanguage}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <Text>{this.props.settings.language}</Text>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    container: {
        flexDirection: 'row',
    },
    headerContainer: {
        justifyContent: 'center'
    },
    header: {
        color: '#7154b8',
        margin: 4,
        paddingBottom: 2,
        fontSize: 25,
        textAlign: 'center',
    },
    text: {
        color: '#7154b8',
        marginLeft: 10,
        fontSize: 15,
        marginTop: 15,
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);