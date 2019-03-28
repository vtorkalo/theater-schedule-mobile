import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { storeSettings } from "../Actions/settingsActions";
import LocalizeComponent from "../Localization/LocalizedComponent";
import { setLanguage } from "redux-i18n";
import UniformButton from "../Screens/Components/UniformButton"
import {
  Container,
  Content,
  Picker,
  ListItem,
  Left,
  Right,
  Switch,
  Separator,
  Toast,
} from "native-base";
import Text from './Components/CustomText';

class SettingsScreen extends LocalizeComponent {
  static navigationOptions = ({ screenProps }) => {
    return {
      drawerIcon: <MaterialCommunityIcons name="settings-box" size={25} />,
      title: screenProps.SettingsScreenTitle
    };
  };

  state = {
    settings: {
      languageCode: this.props.settings.settings.languageCode,
      doesNotify: this.props.settings.settings.doesNotify,
      notificationFrequency: this.props.settings.settings.notificationFrequency
    }
  };

  componentDidUpdate(prevState) {
    if (!prevState.settings.error && this.props.settings.error) {
      Toast.show({
        text: this.t("Please try again"),
        buttonText: "Okay",
        type: "danger"
      });
    } else if (prevState.settings.loading && !this.props.settings.error) {
      Toast.show({
        text: this.t("Settings saved"),
        buttonText: "Okay",
        type: "success"
      });
    }
  }

  onSaveLanguage = () => {
    this.props.storeSettings(this.props.settings.deviceId, this.state.settings);
  };

  render() {
    return (
      <Container>
        <DrawerMenucIcon
          onPressMenuIcon={() => this.props.navigation.openDrawer()}
          text={this.t('Settings')} />
        <Content contentContainerStyle={styles.contentContainer}>
          <ListItem>
            <Left>
              <Text style={styles.optionTitle}>{this.t("Set language")}:</Text>
            </Left>

            <Right>
              <Picker
                note
                mode="dropdown"
                selectedValue={this.state.settings.languageCode}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState(prevState => ({
                    settings: {
                      ...prevState.settings,
                      languageCode: itemValue
                    }
                  }))
                }
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Українська" value="uk" />
              </Picker>
            </Right>
          </ListItem>

          <Separator bordered />

          <ListItem>
            <Left>
              <Text style={styles.optionTitle}>{this.t("Push notifications")}:</Text>
            </Left>

            <Right>
              <Switch
                thumbColor="#7154b8"
                trackColor={{ false: "#a4a3a8", true: "#af94ef" }}
                value={this.state.settings.doesNotify}
                onValueChange={value =>
                  this.setState(prevState => ({
                    settings: {
                      ...prevState.settings,
                      doesNotify: value
                    }
                  }))
                }
              />
            </Right>
          </ListItem>

          <ListItem>
            <Left>
              <Text style={styles.optionTitle}>{this.t("Notify in")}:</Text>
            </Left>

            <Right>
              <Picker
                note
                selectedValue={this.state.settings.notificationFrequency}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState(prevState => ({
                    settings: {
                      ...prevState.settings,
                      notificationFrequency: itemValue
                    }
                  }))
                }
              >
                <Picker.Item label={`3 ${this.t("days")}`} value={3} />
                <Picker.Item label={`7 ${this.t("days")}`} value={7} />
                <Picker.Item label={`14 ${this.t("days")}`} value={14} />
                <Picker.Item label={`30 ${this.t("days")}`} value={30} />
              </Picker>
            </Right>
          </ListItem>
          <Separator />

          <UniformButton
            text={this.t("Save")}
            style={styles.button}
            onPress={this.onSaveLanguage}
          />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  optionTitle: {
    color: "#000",
    fontSize: 20,
  },
  picker: {
    height: 30,
    width: 120
  },
  button: {
    margin: 20,
    alignSelf: "flex-end"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  }
});

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = {
  storeSettings,
  setLanguage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
