import React from "react";
import {Toast} from 'native-base';
import {
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from "react-native";
import { Container, Content } from "native-base";
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import {
  enterMessageSubject,
  enterMessageText,
  validateMessageSubject,
  validateMessageText,
  sendMessage
} from "../Actions/messageActions";
import LocalizeComponent from "../Localization/LocalizedComponent";
import UniformButton from "../Screens/Components/UniformButton"
import Text from './Components/CustomText';

class MessageScreen extends LocalizeComponent {
	state = {
      		'UserID': ''
   	}
   componentDidMount = () => AsyncStorage.getItem('UserId').then((value) => this.setState({ 'UserID': value }))

  static navigationOptions = ({ screenProps }) => {
    return {
      drawerIcon: (<MaterialCommunityIcons name="message" size={25} />),
      title: screenProps.MessageScreenTitle,
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.message.sendingError && this.props.message.sendingError) {
      if(this.props.sendError !== null)
      {       
        if(`${this.props.sendError}` === "Error: Unauthorized")
        {
        Toast.show({
        text: this.t("Please log in"),
        buttonText: "Okay",
        type: "warning",
        duration: 5000 })
        }

      if(`${this.props.sendError}` === "Error: Some problems!!!")
      {
        Toast.show({
        text: this.t("There was a problem during the operation. Please try again or log in"),
        buttonText: "Okay",
        type: "warning",
        duration: 5000 })        
      }
    }
      this.props.sendError == null;
     
      this.props.enterMessageSubject("");
      this.props.enterMessageText("");
    } else if (
      prevProps.message.isSending &&
      !this.props.message.sendingError
    ) {
      Alert.alert(this.t("sendingSuccess"), this.t("successMessage"));
    }
  }

  onSendMessage = async () => {
    if(this.state.UserID == null)
    {
      await AsyncStorage.getItem('UserId').then((value) => this.setState({ 'UserID': value }))
    }
    this.props.validateMessageSubject();
    this.props.validateMessageText();
    this.props.sendMessage({
      subject: this.props.message.subject,
      messageText: this.props.message.text,
      AccountId: this.state.UserID
    });
  };

  render() {
    if (this.props.message.isSending) {
      return (
        <View style={{ flex: 1, paddingTop: 300 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { subjectError, textError } = this.props.message;
    return (
      <Container>
        <DrawerMenucIcon
          onPressMenuIcon={() => this.props.navigation.openDrawer()}
          text={this.t('Message')} />
        <Content contentContainerStyle={styles.contentContainer}>
          <Text type="bold" style={styles.header}>{this.t("messageScreenHeader")}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.subject}
              value={this.props.message.subject}
              maxLength={50}
              placeholder={this.t("messageSubject")}
              onChangeText={text => {
                this.props.enterMessageSubject(text);
              }}
              onBlur={this.props.validateMessageSubject}
            />
            {subjectError ? (
              <Text style={styles.error}>{this.t("subjectError")}</Text>
            ) : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.message}
              value={this.props.message.text}
              multiline={true}
              maxLength={500}
              placeholder={this.t("messageText")}
              onChangeText={text => {
                this.props.enterMessageText(text);
              }}
              onBlur={this.props.validateMessageText}
            />
            {textError ? <Text style={styles.error}>{this.t("textError")}</Text> : null}
          </View>
            <UniformButton
                            text={this.t("send")}
                            style={styles.button}                     
                            onPress={this.onSendMessage}
                        />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,      
  sendError: state.message.sendingError, 
  deviceId: state.settings.deviceId
});

const mapDispatchToProps = dispatch => {
  return {
    enterMessageSubject: subject => dispatch(enterMessageSubject(subject)),
    enterMessageText: text => dispatch(enterMessageText(text)),
    validateMessageSubject: () => dispatch(validateMessageSubject()),
    validateMessageText: () => dispatch(validateMessageText()),
    sendMessage: message => dispatch(sendMessage(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageScreen);

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    margin:20,
    width: "65%",
      justifyContent: 'center',
},
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  header: {
    color: "#7154b8",
    fontSize: 20,
    margin: 10
  },
  inputContainer: {
    margin: 10,
    padding: 10,
    //height: 300
    width: "85%"
  },
  error: {
    color: "red"
    //fontWeight: 'bold',
    //fontSize: 30,
  },
  subject: {
    height: 40,
    //width: "85%",
    //margin: 20,
    padding: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f5f5f5"
  },
  message: {
    height: 200,
    //width: "85%",
    //margin: 20,
    padding: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
    textAlignVertical: 'top'
  },
  buttonContainer: {
    margin: 20,
    width: "85%"
  }
});
