import React, { Component } from 'react';
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import { connect } from "react-redux";
import { storeSettings } from "../Actions/settingsActions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocalizeComponent from "../Localization/LocalizedComponent";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  AsyncStorage
} from 'react-native';
import jwt_decode from 'jwt-decode';

export default class LoginView extends LocalizeComponent {
    static navigationOptions = ({screenProps}) => {
        return {
            drawerIcon: <MaterialCommunityIcons name="settings-box" size={25} />,
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

  submitLogin = async () => {
    fetch("http://192.168.103.28:5000/api/Authorization",
      {method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          Email: this.state.email,
          PasswordHash: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((res) => {
        this.setState({accessToken: res.accessToken, expires: res.expiresTime, refreshToken: res.refreshToken});
        this.setState({decoded: jwt_decode(res.accessToken)});
        console.log("access: " + this.state.accessToken + " expires: " + this.state.expires + " refresh: " + this.state.refreshToken);
        console.log(this.state.decoded)
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
  }

  /* onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  } */

  render() {
    return (
      <View style={styles.container}>
          <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()}
          text={this.t('Settings')} />
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.submitLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer}>
          <Text>Continue as Guest</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});