import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert
} from "react-native";
import { Container, Content } from "native-base";
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import {
  enterSubject,
  enterMessage,
  validateSubject,
  validateMessage,
  sendMessage
} from "../Actions/messageActions";

class MessageScreen extends Component {
  static navigationOptions = {
    drawerIcon: <MaterialCommunityIcons name="message" size={25} />
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.message.sendingError && this.props.message.sendingError) {
      Alert.alert("Error", "Please try again");
    } else if (
      prevProps.message.isSending &&
      !this.props.message.sendingError
    ) {
      Alert.alert("Thank you", "Your message was sent");
    }
  }

  onSendMessage = () => {
    this.props.validateSubject();
    this.props.validateMessage();

    this.props.sendMessage({
      subject: this.props.message.subject,
      message: this.props.message.message
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

    const { subjectError, messageError } = this.props.message;
    return (
      <Container>
        <DrawerMenucIcon
          onPressMenuIcon={() => this.props.navigation.openDrawer()}
        />
        <Content contentContainerStyle={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.subject}
              value={this.props.message.subject}
              placeholder="Subject"
              onChangeText={text => {
                this.props.enterSubject(text.trim());
              }}
              onBlur={this.props.validateSubject}
            />
            {subjectError ? (
              <Text style={styles.error}>{subjectError}</Text>
            ) : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.message}
              value={this.props.message.message}
              multiline={true}
              maxLength={200}
              placeholder="Your message..."
              onChangeText={text => {
                this.props.enterMessage(text.trim());
              }}
              onBlur={this.props.validateMessage}
            />
            {messageError ? (
              <Text style={styles.error}>{messageError}</Text>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this.onSendMessage} title="Send" />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => {
  return {
    enterSubject: subject => dispatch(enterSubject(subject)),
    enterMessage: message => dispatch(enterMessage(message)),
    validateSubject: () => dispatch(validateSubject()),
    validateMessage: () => dispatch(validateMessage()),
    sendMessage: message => dispatch(sendMessage(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageScreen);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  },
  inputContainer: {
    margin: 20,
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
    backgroundColor: "#f5f5f5"
  },
  buttonContainer: {
    margin: 20,
    width: "85%"
  }
});
