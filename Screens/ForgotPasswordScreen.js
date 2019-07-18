import React from 'react';
import {Text, View, KeyboardAvoidingView, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import LocalizeComponent from '../Localization/LocalizedComponent';
import {NavigationActions} from 'react-navigation';
import {Constants} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import UniformButton from './Components/UniformButton';
import CustomTextField from './UserProfileComponents/CustomTextField';
import {Content, Container, Toast} from 'native-base';
import { Entypo } from '@expo/vector-icons';

import {
    enterCode,
    enterEmail,
    validateCode,
    validateEmail,
    sendCode,
    sendEmail,
} from '../Actions/forgotPasswordActions';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;

class ForgotPasswordScreen extends LocalizeComponent {

    state = {
        confirmed: false,
    }

    ValidateEmail(){
        return this.props.forgotPassword.EmailError === "";
    }

    ValidateCode(){
        return this.props.forgotPassword.CodeError === "";
    }

    ValidatePassword(){
      return this.props.forgotPassword.PasswordError === "";
    }

    onSendEmail = () => {
        if (this.ValidateEmail()){
          this.props.sendEmail({
            Email: this.props.forgotPassword.Email
          }).then((response) => {
            console.log(response);
            if (response.status == 201) {
              Toast.show({
                text: this.t("Code sended!"),
                buttonText: "Okay",
                type: "success",
                duration: 30000
              })
            }
          })
          .then(() => this.setState({confirmed: true}))
          .catch((error) => console.error(error));
        } else {
            Toast.show({
                text: this.t("Fill the field correctly"),
                buttonText: "Okay",
                type: "danger",
                duration: 3000
            })
        }
    }

    onSendCode = () => {
        if (this.ValidateCode()){
          this.props.sendCode({
            Code: this.props.forgotPassword.Code
          }).then((response) => {
            console.log(response);
            if (response.status == 200) {
              Toast.show({
                text: this.t("Code confirmed!"),
                buttonText: "Okay",
                type: "success",
                duration: 3000
              })
            }            
          })
          .then(() => this.props.navigation.navigate("resetPasswordScreen"))
          .catch((error) => console.log(error));
        } else {
            Toast.show({
                text: this.t("Fill the field correctly"),
                buttonText: "Okay",
                type: "danger",
                duration: 3000
            })
        }
    }

    render() {
        return (
          <Container contentContainerStyle={styles.all}>
            <View style={styles.screen}>
              <View style={styles.header}>
                <FontAwesome
                  name="lock"
                  size={scale(50)}
                  style={{ color: "#4A4A4A" }}
                />
                <Text
                  style={styles.headerText}
                >
                  {this.t("Password restore")}
                </Text>
              </View>
    
              <Content >
                <View >
                  <KeyboardAvoidingView behavior='padding'>
                    
                    <View style={{display: this.state.confirmed ? "none" : "flex"}}>
                    <CustomTextField
                      label={this.t("LOGIN")}
                      labelTextStyle={{}}
                      onChangeText={(txt) => this.props.enterEmail(txt)}
                      onBlur={this.props.validateEmail}
                    />
                    {this.props.forgotPassword.EmailError ? 
                        (<Text style={styles.error}>{this.t(this.props.forgotPassword.EmailError)}</Text>) : null}

                    </View>
                    <View style={{display: this.state.confirmed ? "flex" : "none"}}>
                      <CustomTextField
                        label={this.t("VALIDATION CODE")}
                        labelTextStyle={{}}
                        onChangeText={(txt) => this.props.enterCode(txt)}
                        onBlur={this.props.validateCode}
                      />
                      {this.props.forgotPassword.CodeError ? 
                          (<Text style={styles.error}>{this.t(this.props.forgotPassword.CodeError)}</Text>) : null}
                    </View>

                      <UniformButton
                        text={this.t("send")}
                        style={styles.button}
                        onPress={!this.state.confirmed ? this.onSendEmail : this.onSendCode}
                      />
                  </KeyboardAvoidingView>                
                </View>
              </Content>
    
              <TouchableOpacity
                style={styles.back}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                <FontAwesome
                  name="chevron-left"
                  size={27}
                  style={{ color: "#4A4A4A" }}
                />
              </TouchableOpacity>
            </View>
          </Container>
        );
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
  error: {
    color: "red"
  },
  headerText:{
    fontSize: scale(28), fontWeight: "800", color: "#4A4A4A"
  },
});

const mapStateToProps = (state) => ({
        forgotPassword: state.forgotPassword,
        languageCode: state.settings.settings.languageCode,
        deviceId: state.settings.deviceId,
})

const mapDispatchToProps = dispatch => {
    return {
        enterCode: code => dispatch(enterCode(code)),
        enterEmail: email => dispatch(enterEmail(email)),
        validateCode: () => dispatch(validateCode()),
        validateEmail: () => dispatch(validateEmail()),
        sendEmail: mail => dispatch(sendEmail(mail)),
        sendCode: resetCode => dispatch(sendCode(resetCode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);