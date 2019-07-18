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

class ResetPasswordScreen extends LocalizeComponent {
    state = {
        pass: ''
    }

    ValidatePassword(){
        return this.props.resetPassword.PasswordError === "";
    }

    onSendPassword = () => {
        if (this.ValidatePassword()){
          this.props.sendPassword({
            Password: this.props.resetPassword.Password
          }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                Toast.show({
                    text: "Confirmed!",
                    buttonText: "Okay",
                    type: "success",
                    duration: 3000
                })
            }         
          })
          .then(() => this.props.navigation.navigate("authorizationScreen"))
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
                    <CustomTextField
                      secureTextEntry = {true}
                      label={this.t("PASSWORD")}
                      labelTextStyle={{}}
                      onChangeText={(txt) => this.props.enterPassword(txt)}
                      onBlur={this.props.validatePassword}
                    />
                    {this.props.resetPassword.PasswordError ? 
                        (<Text style={styles.error}>{this.t(this.props.resetPassword.PasswordError)}</Text>) : null}
                    
                    <UniformButton
                      text={this.t("Send")}
                      style={styles.button}
                      onPress={this.onSendPassword}
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
    resetPassword: state.resetPassword,
    languageCode: state.settings.settings.languageCode,
    deviceId: state.settings.deviceId,
})

const mapDispatchToProps = dispatch => {
    return {
        enterPassword: pass => dispatch(enterPassword(pass)),
        validatePassword: () => dispatch(validatePassword()),
        sendPassword: password => dispatch(sendPassword(password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);