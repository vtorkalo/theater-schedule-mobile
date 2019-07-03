import React, { Component } from 'react';
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import { connect } from "react-redux";
import { storeSettings } from "../Actions/settingsActions";
import LocalizeComponent from "../Localization/LocalizedComponent";
import {NavigationActions} from 'react-navigation';
import {Constants} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import TextError from './Components/CustomText';

import {
  enterAuthLogin,
  enterAuthPass,
  validateLogin,
  sendAuthBegin,
  sendAuthSuccess,
  sendAuthFailure,
  sendAuthorization
} from '../Actions/authorizationActions';
import {Content, Container} from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  AsyncStorage,
  Dimensions
} from 'react-native';
import jwt_decode from 'jwt-decode';
import UniformButton from './Components/UniformButton';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;


class AuthorizationScreen extends LocalizeComponent {
    /* static navigationOptions = ({screenProps}) => {
        return {
            drawerIcon: <MaterialCommunityIcons name="settings-box" size={25} />,
            title: screenProps.AuthorizationScreenTitle
        };
    }; */

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
    let data = JSON.parse(res._bodyInit);
    this.setState({
      accessToken: data.accessToken, 
      expires: data.expires, 
      refreshToken: data.refreshToken, 
      decoded: jwt_decode(data.accessToken)});
    })
    .then(async () => {
      await AsyncStorage.setItem('FirstName', this.state.decoded.firstName);
      await AsyncStorage.setItem('LastName', this.state.decoded.lastName);
      await AsyncStorage.setItem('UserId', this.state.decoded.userId);
      await AsyncStorage.setItem('Email', this.state.decoded.email);
      await AsyncStorage.setItem('DateOfBirth', this.state.decoded.dateOfBirth);
      await AsyncStorage.setItem('Country', this.state.decoded.country);
      await AsyncStorage.setItem('City', this.state.decoded.city);
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
      <Container contentContainerStyle={styles.all}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <FontAwesome
              name="sign-in"
              size={scale(50)}
              style={{color: "#4A4A4A"}}/>
              <Text style={{fontSize: scale(28), fontWeight: "800", color: "#4A4A4A"}}>
                Authorization</Text>
            </View>

            <Content >
              <View style={styles.content}>
                <TextInput
                  textContentType="username"
                  placeholder="LOGIN"
                  placeholderTextColor="#707070"
                  style={styles.input}
                  onChangeText={(txt) => this.props.enterAuthLogin(txt)}
                  onBlur={this.props.validateLogin} />
                  {this.props.authorization.LoginError ? 
                    (<Text style={styles.error}>{this.t(this.props.authorization.LoginError)}</Text>) : null}

                  <TextInput
                    textContentType="password"
                    secureTextEntry={true}
                    placeholder="PASSWORD"
                    placeholderTextColor="#707070"
                    style={styles.input}
                    onChangeText={(txt) => this.props.enterAuthPass(txt)} />

                    <UniformButton text="Send" style={styles.button} onPress={this.onSendMessage} />

                </View>
              </Content>

              <View>
                <View style={styles.textRow}>
                  <UniformButton text="Forgot password?" onPress={() => this.props.navigation.navigate("ForgotPassword")} />
                </View>
              </View>

              <View>
                <View style={styles.textRow}>
                  <UniformButton text="Continue as Guest" onPress={() => this.props.navigation.navigate("drawerStack")} />
                </View>
              </View>

              <View>
                <View style={styles.textRow}>
                  <UniformButton text="Registration" onPress={() => this.props.navigation.navigate("registrationScreen")} />
                </View>
              </View>

              <TouchableHighlight style={styles.back} onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                <FontAwesome name="chevron-left" size={27} style={{color: "#4A4A4A"}} />
              </TouchableHighlight>
            </View>
          </Container>
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
    margin: 20,
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
    marginTop: scaleVertical(36),
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
    marginTop: scaleVertical(20),
    marginBottom: scaleVertical(8),
    paddingHorizontal: 8
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