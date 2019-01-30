import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Button, View } from 'react-native';
import { setLanguage } from "redux-i18n";
import LocalizedComponent from "./Localized/LocalizedComponent";

class MyComponent2 extends LocalizedComponent {
    render() {
        return (
            <View style={{ backgroundColor: "blue" }}>
                <Text>this is my component</Text>
                <Text>{this.t('Hello world!')}</Text>
            </View>
        );
    }
}

export default connect(
  
)(MyComponent2)