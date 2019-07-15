import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Constants } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import LocalizeComponent from "../Localization/LocalizedComponent";
import TextError from './Components/CustomText';
import {
  enterRegistrationFirstName,
  enterRegistrationCity,
  enterRegistrationTelephone,
  enterRegistrationBirthdate,
  enterRegistrationEmail,
  enterRegistrationPassword,

  validateRegistrationFirstName,
  validateRegistrationCity,
  validateRegistrationTelephone,
  validateRegistrationBirthdate,
  validateRegistrationEmail,
  validateRegistrationPassword,
  sendRegistration
} from "../Actions/RegistrationActions";
import { DatePicker } from 'native-base';
import { Content, Container } from 'native-base';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;


const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;

class RegistrationScreen extends LocalizeComponent {


  ValidateForm() {
    return (
      this.props.registration.FirstNameError === ""
      && this.props.registration.CityError === ""
      && this.props.registration.TelephoneError === ""
      && this.props.registration.EmailError === ""
      && this.props.registration.BirthDate != ""
      && this.props.registration.PasswordError === ""
      );
  }

  onSendMessage = () => {
    if (this.ValidateForm()){
      this.props.sendRegistration({
        FirstName: this.props.registration.FirstName,
        City: this.props.registration.City,
        PhoneNumber: this.props.registration.Telephone,
        DateOfBirth: this.props.registration.BirthDate,
        Email: this.props.registration.Email,
        Password: this.props.registration.Password,
        PhoneIdentifier: this.props.deviceId
      });
      this.props.navigation.navigate("drawerStack");
    } else {
      alert("Fill the form");
    }
  };


  render() {
    return (
      <Container contentContainerStyle={styles.all}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <FontAwesome
              name="edit"
              size={scale(50)}
              style={{ color: "#4A4A4A" }}
            />
            <Text
              style={styles.headerText}
            >
              {this.t("Registration")}
            </Text>
          </View>

          <Content >
            <View >
              <KeyboardAvoidingView behavior='padding'>
                <TextInput
                  textContentType="name"
                  placeholder={this.t("FIRSTNAME")}
                  placeholderTextColor="#707070"
                  style={styles.input}
                  onChangeText={(txt) => this.props.enterRegistrationFirstName(txt)}
                  onBlur={this.props.validateRegistrationFirstName}
                />
                {this.props.registration.FirstNameError ? (
                  <TextError style={styles.error}>{this.t(this.props.registration.FirstNameError)}</TextError>
                ) : null}

                <TextInput
                  textContentType="addressCity"
                  placeholder={this.t("CITY")}
                  placeholderTextColor="#707070"
                  style={styles.input}
                  onChangeText={(txt) => this.props.enterRegistrationCity(txt)}
                  onBlur={this.props.validateRegistrationCity}
                />
                {this.props.registration.CityError ? (
                  <TextError style={styles.error}>{this.t(this.props.registration.CityError)}</TextError>
                ) : null}

                <TextInput
                  textContentType="telephoneNumber"
                  placeholder={this.t("TELEPHONE")}
                  placeholderTextColor="#707070"
                  style={styles.input}
                  onChangeText={(txt) => this.props.enterRegistrationTelephone(txt)}
                  onBlur={this.props.validateRegistrationTelephone}
                />
                {this.props.registration.TelephoneError ? (
                  <TextError style={styles.error}>{this.t(this.props.registration.TelephoneError)}</TextError>
                ) : null}
                  <DatePicker
                    style={styles.input}
                    androidMode='spinner'
                    defaultDate={new Date(2018, 4, 4)}
                    locale={this.props.languageCode}
                    timeZoneOffsetInMinutes={120}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={this.t("SELECT DATE OF BIRTH")}
                    textStyle={{ color: "green" }}
                    placeHolderTextStyle={{
                      color: "#707070", fontWeight: "bold"
                    }}
                    onDateChange={(txt) => { this.props.enterRegistrationBirthdate(txt); }}
                    disabled={false}
                  />
                  {this.props.registration.BirthDateError ? (
                    <TextError style={styles.error}>{this.t(this.props.registration.BirthDateError)}</TextError>
                  ) : null}

                <TextInput
                  textContentType="emailAddress"
                  placeholder={this.t("EMAIL")}
                  placeholderTextColor="#707070"
                  style={styles.input}
                  onChangeText={(txt) => this.props.enterRegistrationEmail(txt)}
                  onBlur={this.props.validateRegistrationEmail}
                />
                {this.props.registration.EmailError ? (
                  <TextError style={styles.error}>{this.t(this.props.registration.EmailError)}</TextError>
                ) : null}

                <TextInput
                  textContentType="password"
                  secureTextEntry={true}
                  placeholder={this.t("PASSWORD")}
                  placeholderTextColor="#707070"
                  style={styles.input}
                  onChangeText={(txt) => this.props.enterRegistrationPassword(txt)}
                  onBlur={this.props.validateRegistrationPassword}
                />
                {this.props.registration.PasswordError ? (
                  <TextError style={styles.error}>{this.t(this.props.registration.PasswordError)}</TextError>
                ) : null}

                <UniformButton
                  text={this.t("send")}
                  style={styles.button}
                  onPress={this.onSendMessage}
                />
              </KeyboardAvoidingView>
              <View>
                <View style={styles.textRow}>
                  <Text style={styles.textRowContinue}>
                    {this.t("Already have an account?")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("AuthorizationScreen")}>
                    <Text style={styles.textRowContinue}> {this.t("Sign in now.")} </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View style={styles.textRow}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("drawerStack")}>
                    <Text style={styles.textRowContinue}> {this.t("Continue without registration")} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Content>




          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
          >
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
  textRowContinue:{
    color: "#3B4EFE", fontSize: 18, marginTop: 8
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
    marginTop: scaleVertical(28),
    marginBottom: scaleVertical(8),
    paddingHorizontal: 8
  },
  error: {
    color: "red"
  },
  headerText:{
    fontSize: scale(28), fontWeight: "800", color: "#4A4A4A"
  }
});


const mapStateToProps = (state) => ({
  registration: state.registration,
  languageCode: state.settings.settings.languageCode,
  deviceId: state.settings.deviceId,
})

const mapDispatchToProps = dispatch => {
  return {
    enterRegistrationFirstName: txt => dispatch(enterRegistrationFirstName(txt)),
    enterRegistrationCity: txt => dispatch(enterRegistrationCity(txt)),
    enterRegistrationTelephone: txt => dispatch(enterRegistrationTelephone(txt)),
    enterRegistrationBirthdate: txt => dispatch(enterRegistrationBirthdate(txt)),
    enterRegistrationEmail: txt => dispatch(enterRegistrationEmail(txt)),
    enterRegistrationPassword: txt => dispatch(enterRegistrationPassword(txt)),
    validateRegistrationFirstName: () => dispatch(validateRegistrationFirstName()),
    validateRegistrationCity: () => dispatch(validateRegistrationCity()),
    validateRegistrationTelephone: () => dispatch(validateRegistrationTelephone()),
    validateRegistrationBirthdate: () => dispatch(validateRegistrationBirthdate()),
    validateRegistrationEmail: () => dispatch(validateRegistrationEmail()),
    validateRegistrationPassword: () => dispatch(validateRegistrationPassword()),
    sendRegistration: registration => dispatch(sendRegistration(registration))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);