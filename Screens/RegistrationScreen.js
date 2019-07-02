import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
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

  onSendMessage = () => {
    this.props.validateRegistrationFirstName();
    this.props.validateRegistrationCity();
    this.props.validateRegistrationTelephone();
    this.props.validateRegistrationBirthdate();
    this.props.validateRegistrationEmail();
    this.props.validateRegistrationPassword();

    this.props.sendRegistration({
      FirstName: this.props.registration.FirstName,
      City: this.props.registration.City,
      PnoneNumber: this.props.registration.Telephone,
      DateOfBirth: this.props.registration.BirthDate,
      Email: this.props.registration.Email,
      Password: this.props.registration.Password,
      PhoneIdentifier: this.props.deviceId
    });
    if (this.props.registration.sendingError === null && this.props.registration.FirstNameError === null && this.props.registration.CityError === null && this.props.registration.TelephoneError === null && this.props.registration.BirthDateError === null
      && this.props.registration.EmailError && this.props.registration.PasswordError) {
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
              name="edit"
              size={scale(50)}
              style={{ color: "#4A4A4A" }}
            />
            <Text
              style={{ fontSize: scale(28), fontWeight: "800", color: "#4A4A4A" }}
            >
              {this.t("Registration")}
            </Text>
          </View>

          <Content >
            <View style={styles.content}>
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
                defaultDate={new Date(2018, 4, 4)}
                locale={this.props.languageCode}
                timeZoneOffsetInMinutes={120}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={this.t("SELECT DATE")}
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
                onBlur={this.props.validateRegistrationPasswordß}
              />
              {this.props.registration.PasswordError ? (
                <TextError style={styles.error}>{this.t(this.props.registration.PasswordError)}</TextError>
              ) : null}

              <UniformButton
                text={this.t("send")}
                style={styles.button}
                onPress={this.onSendMessage}
              />
            </View>
          </Content>

          <View>
            <View style={styles.textRow}>
              <Text style={{ color: "#484848", fontSize: 18, marginTop: 8 }}>
                {this.t("Already have an account?")}
              </Text>
              <Button
                title={this.t("Sign in now.")}
                onPress={() => this.props.navigation.navigate("SignIn")}
              />
            </View>
          </View>

          <View>
            <View style={styles.textRow}>
              <Button
                title={this.t("Continue without registration")}
                onPress={() => this.props.navigation.navigate("drawerStack")}
              />
            </View>
          </View>


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
    //fontWeight: 'bold',
    //fontSize: 30,
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