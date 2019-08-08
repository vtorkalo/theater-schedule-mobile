import React from 'react';
import {Text, View, KeyboardAvoidingView, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import LocalizeComponent from '../Localization/LocalizedComponent';
import {Constants} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import UniformButton from './Components/UniformButton';
import CustomTextField from './UserProfileComponents/CustomTextField';
import {Content, Container, Toast} from 'native-base';
import {BallIndicator} from 'react-native-indicators';

import {
    enterCode,
    enterEmail,
    validateCode,
    validateEmail,
    sendCode,
    sendEmail,
} from '../Actions/forgotPasswordActions';

import {
  enterPassword,
  validatePassword,
  sendPassword
} from '../Actions/resetPasswordActions';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;

class ForgotPasswordScreen extends LocalizeComponent {

    state = {
        confirmed: false,
        codeConfirmed: false,
        userId: 0
    }

    onSendEmail = () => {

      this.props.validateEmail();

        if (this.props.forgotPassword.EmailError === "" && this.props.forgotPassword.Email !== "") {
          this.props.sendEmail({
            Email: this.props.forgotPassword.Email
          }).then((res) => {
            if (this.props.forgotPassword.emailSendingError === null) {
              Toast.show({
                text: this.t("Code sended!"),
                buttonText: this.t("Okay"),
                type: "success",
                duration: 30000
              });
              this.setState({confirmed: true, userId: res});
            } else {
              Toast.show({
                text: this.t(this.props.forgotPassword.emailSendingError.toString()),
                buttonText: this.t("Okay"),
                type: "danger",
                duration: 5000
              })
            }
          })
          .catch((error) => console.error(error));
        } else {
            Toast.show({
                text: this.t("Fill the field correctly"),
                buttonText: this.t("Okay"),
                type: "danger",
                duration: 5000
            })
        }
    }

    onSendCode = () => {

      this.props.validateCode();

          if (this.props.forgotPassword.CodeError === "" && this.props.forgotPassword.Code !== ""){
          this.props.sendCode({
            Id: this.state.userId,
            ValidationCode: this.props.forgotPassword.Code
          }).then(() => {
            if (this.props.forgotPassword.codeSendingError === null) {
              Toast.show({
                text: this.t("Code confirmed!"),
                buttonText: this.t("Okay"),
                type: "success",
                duration: 5000
              });
              this.setState({codeConfirmed: true});
            } else {
              Toast.show({
                text: this.t(this.props.forgotPassword.codeSendingError.toString()),
                buttonText: this.t("Okay"),
                type: "danger",
                duration: 5000
              })
            }            
          })
          .catch((error) => console.log(error));
        } else {
            Toast.show({
                text: this.t("Fill the field correctly"),
                buttonText: this.t("Okay"),
                type: "danger",
                duration: 5000
            })
        }
    }

    onSendPassword = () => {
      this.props.validatePassword();
      if (this.props.forgotPassword.PasswordError === "" && this.props.forgotPassword.Password !== ""){
        this.props.sendPassword({
          Id: this.state.userId,
          Password: this.props.forgotPassword.Password
        }).then(() => {
          if (this.props.forgotPassword.passSendingError === null){
            Toast.show({
              text: this.t("Confirmed!"),
              buttonText: this.t("Okay"),
              type: "success",
              duration: 5000
            });
            this.setState({confirmed: false, codeConfirmed: false, userId: 0});
            this.props.navigation.navigate("authorizationScreen");
          } else {
            Toast.show({
              text: this.t(this.props.forgotPassword.passSendingError.toString()),
              buttonText: this.t("Okay"),
              type: "danger",
              duration: 5000
            })
          }
        })
        .catch((error) => console.log(error))
      } else {
        Toast.show({
          text: this.t("Fill the field correctly"),
          buttonText: this.t("Okay"),
          type: "danger",
          duration: 5000
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
                        onChangeText={(txt) => {
                          this.props.enterEmail(txt);
                          this.props.validateEmail();
                        }}
                      />
                      {this.props.forgotPassword.EmailError ? 
                          (<Text style={styles.error}>{this.t(this.props.forgotPassword.EmailError)}</Text>) : null}

                    </View>
                    <View style={{display: (this.state.confirmed && !this.state.codeConfirmed) ? "flex" : "none"}}>
                      <CustomTextField
                        label={this.t("VALIDATION CODE")}
                        labelTextStyle={{}}
                        onChangeText={(txt) => {
                          this.props.enterCode(txt);
                          this.props.validateCode();
                        }}
                      />
                      {this.props.forgotPassword.CodeError ? 
                          (<Text style={styles.error}>{this.t(this.props.forgotPassword.CodeError)}</Text>) : null}
                    </View>
                    
                    <View style={{display: this.state.codeConfirmed ? "flex" : "none"}}>
                      <CustomTextField
                        secureTextEntry={true}
                        label={this.t("Password")}
                        labelTextStyle={{}}
                        onChangeText={(txt) => {
                          this.props.enterPassword(txt);
                          this.props.validatePassword();
                        }}
                        />

                        {this.props.forgotPassword.PasswordError ? 
                          <Text style={styles.error}>{this.t(this.props.forgotPassword.PasswordError)}</Text> : null}
                    </View>

                    <View style={{...styles.button, display: this.props.forgotPassword.isLoaded ? "flex" : "none"}}>
                      <BallIndicator color="#aaa" />
                    </View>

                    <View style={{display: this.state.codeConfirmed ? "none": "flex"}}>
                      <UniformButton
                        text={this.t("send")}
                        style={{...styles.button, display: this.props.forgotPassword.isLoaded ? "none" : "flex"}}
                        onPress={!this.state.confirmed ? this.onSendEmail : this.onSendCode}
                      />
                    </View>

                    <View style={{display: (this.state.codeConfirmed && this.state.confirmed) ? "flex": "none"}}>
                      <UniformButton
                        text={this.t("Submit")}
                        style={{...styles.button, display: !this.props.forgotPassword.isLoaded ? "flex" : "none"}}
                        onPress={this.onSendPassword} />
                    </View>

                  </KeyboardAvoidingView>                
                </View>
              </Content>
    
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
        enterPassword: pass => dispatch(enterPassword(pass)),
        validatePassword: () => dispatch(validatePassword()),
        sendPassword: password => dispatch(sendPassword(password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);