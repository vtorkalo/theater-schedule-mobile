import React, {Component} from 'react';
import {Text, View, TextInput, KeyboardAvoidingView, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import LocalizeComponent from '../Localization/LocalizedComponent';
import {NavigationActions} from 'react-navigation';
import {Constants} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import UniformButton from './Components/UniformButton';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;

export default class ForgotPasswordScreen extends LocalizeComponent {
    state = {
        email: ''
    }
    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.conntent}>
                    <KeyboardAvoidingView behavior="padding">
                        <View style={styles.txtBox}>
                            <Text>Для відновлення паролю введіть, будь ласка, адресу Вашої електронної пошти.</Text>
                            <Text>Після підтвердження Ви отримаєте на пошту лист з посиланням на сторінку відновлення паролю.</Text>
                        </View>
                        <View style={styles.inputBox}>
                            <TextInput 
                                textContentType="email"
                                placeholder="EMAIL"
                                placeholderTextColor="#707070"
                                style={styles.input}
                                onChangeText={(txt) => this.setState({email: txt})}
                                />
                        </View>

                        <View style={styles.textRow}>
                            <UniformButton text={this.t("Send")} style={styles.button} onPress={() => this.props.navigation.navigate("resetPasswordScreen")} />
                        </View>
                    </KeyboardAvoidingView>
                </View>

                <TouchableHighlight style={styles.back} onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                    <FontAwesome name="chevron-left" size={27} style={{color: "#4A4A4A"}} />
                </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create ({
    screen: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: scaleVertical(28),
        paddingHorizontal: scale(16),
        flex: 1,
        backgroundColor: "rgb(245, 245, 245)"
      },
    content: {
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: scaleVertical(12)
    },
    input: {
        borderWidth: 0.5,
        borderColor: "#D3D3D3",
        borderRadius: 50,
        padding: 18,
        marginVertical: scaleVertical(6),
        fontWeight: "bold"
    },
    textRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: scaleVertical(5),
        marginBottom: scaleVertical(5),
        paddingHorizontal: 8,
    },
    button: {
        alignSelf: "center",
        marginBottom: 10,
        width: "65%",
        justifyContent: 'center',
        marginTop: 8
    },
    back: {
        position: "absolute",
        top: Constants.statusBarHeight + 8,
        left: 16,
        zIndex: 1
    },
})