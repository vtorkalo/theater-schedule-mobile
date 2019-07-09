import React, { Component } from 'react';
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import { connect } from "react-redux";
import { storeSettings } from "../Actions/settingsActions";
import LocalizeComponent from "../Localization/LocalizedComponent";
import {NavigationActions} from 'react-navigation';
import {Constants} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import TextError from './Components/CustomText';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {
  enterAuthLogin,
  enterAuthPass,
  validateLogin,
  sendAuthBegin,
  sendAuthSuccess,
  sendAuthFailure,
  sendAuthorization
} from '../Actions/authorizationActions';
import {Content, Container, Input} from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  AsyncStorage,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import jwt_decode from 'jwt-decode';
import UniformButton from './Components/UniformButton';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;


class AuthorizationScreen extends LocalizeComponent {
    static navigationOptions = ({screenProps}) => {
        return {
            drawerIcon: <MaterialCommunityIcons name="arrow-right-bold-box" size={25} />,
            title: screenProps.AuthorizationScreenTitle
        };
    };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      accessToken: '',
      expires: '',
      refreshToken: '',
      decoded: '',
    }
  }

  onSendMessage = () => {
    this.props.validateLogin();
    this.props.sendAuthorization({
      Email: this.props.authorization.Login,
      PasswordHash: this.props.authorization.PasswordHash,
    }).then((res) => {
      console.log(res);
      this.setState({
        accessToken: res.accessToken, 
        expires: res.expiresTime, 
        refreshToken: res.refreshToken, 
        decoded: jwt_decode(res.accessToken)});
    })
    .then(() => console.log(this.state.decoded))
    .then(() => console.log(this.state.decoded))
    .then(async () => {
      await AsyncStorage.setItem('FirstName', this.state.decoded.firstName);
      await AsyncStorage.setItem('LastName', this.state.decoded.lastName);
      await AsyncStorage.setItem('UserId', this.state.decoded.userId);
      await AsyncStorage.setItem('Email', this.state.decoded.email);
      await AsyncStorage.setItem('DateOfBirth', this.state.decoded.dateOfBirth);
      await AsyncStorage.setItem('Country', this.state.decoded.country);
      await AsyncStorage.setItem('City', this.state.decoded.city);
      await AsyncStorage.setItem('PhoneNumber', this.state.decoded.phoneNumber);
      await AsyncStorage.setItem('AccessToken', this.state.accessToken);
      await AsyncStorage.setItem('RefreshToken', this.state.refreshToken);
      await AsyncStorage.setItem('ExpiresDate', this.state.expires);
    })
    .then(() => this.props.enterAuthPass(""))
    .catch((error) => console.error(error));

    if (this.props.authorization.sendingError === null) {
      this.props.navigation.navigate("drawerStack");
    } else {
      alert("There was a problem during registration");
    }

  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.all}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <FontAwesome
              name="sign-in"
              size={scale(40)}
              style={{color: "#4A4A4A"}}/>
              <Text style={{fontSize: scale(24), fontWeight: "800", color: "#4A4A4A"}}>
                {this.t('Authorization')}}</Text>
            </View>

            <Content>
              <View style={styles.content}>
                <KeyboardAvoidingView behavior="padding">
                <TextInput
                  textContentType="username"
                  placeholder={this.t("LOGIN")}
                  placeholderTextColor="#707070"
                  style={styles.input}
                  onChangeText={(txt) => this.props.enterAuthLogin(txt)}
                  onBlur={this.props.validateLogin} />
                  {this.props.authorization.LoginError ? 
                    (<Text style={styles.error}>{this.t(this.props.authorization.LoginError)}</Text>) : null}

                  <TextInput
                    textContentType="password"
                    secureTextEntry={true}
                    placeholder={this.t("PASSWORD")}
                    placeholderTextColor="#707070"
                    style={styles.input}
                    onChangeText={(txt) => this.props.enterAuthPass(txt)} />

                  <View style={{alignItems: "center", marginTop: 10}}>
                    <Text onPress={() => this.props.navigation.navigate("ForgotPasswordScreen")} 
                      style={{color: "blue", textDecorationLine: "underline", fontFamily: "Arsenal-Bold"}}>{this.t("Forgot password?")}</Text>
                  </View>
                  </KeyboardAvoidingView>
                </View>

                <View style={styles.textRow}>
                  <UniformButton text={this.t("Login")} style={styles.button} onPress={this.onSendMessage} />
                </View>

                <View style={styles.textRow}>
                  <UniformButton text={this.t("Registration")} style={styles.button} onPress={() => this.props.navigation.navigate("registrationScreen")} />
                </View>

                <View style={styles.guestBtn}>
                  <Text style={{color: "black", fontSize: 14}} onPress={() => this.props.navigation.navigate("drawerStack")}>{this.t("Continue without registration")}</Text>
                </View>

              </Content>

              <TouchableHighlight style={styles.back} onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                <FontAwesome name="chevron-left" size={27} style={{color: "#4A4A4A"}} />
              </TouchableHighlight>
            </View>
          </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: scaleVertical(28),
    paddingHorizontal: scale(16),
    flex: 1,
    backgroundColor: "rgb(245, 245, 245)"
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
  header: {
    marginTop: scaleVertical(28),
    alignItems: "center",
    justifyContent: "center"
  },
  all: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  image: {
    height: scaleVertical(70),
    resizeMode: "contain"
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
  guestBtn: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
    alignSelf: "center",
    margin: 10,
    padding: 10,
    width: "65%"
  },
  error: {
    color: "red"
    //fontWeight: 'bold',
    //fontSize: 30,
  }
});

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  languageCode: state.settings.settings.languageCode,
  deviceId: state.settings.deviceId,
})

const mapDispatchToProps = dispatch => {
  return {
    enterAuthLogin: txt => dispatch(enterAuthLogin(txt)),
    enterAuthPass: txt => dispatch(enterAuthPass(txt)),
    validateLogin: () => dispatch(validateLogin()),
    sendAuthorization: authorization => dispatch(sendAuthorization(authorization))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);