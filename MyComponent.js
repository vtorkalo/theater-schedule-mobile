import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Button, View } from 'react-native';
import { setLanguage } from "redux-i18n";
import LocalizedComponent from "./Localized/LocalizedComponent";

class MyComponent extends LocalizedComponent {
    render() {
        return (
            <View style={{ backgroundColor: "blue" }}>
                <Text>this is my component</Text>
                       
                
                <Button title="ua" onPress={() => this.props.setLanguage("ua")} />
                <Button title="en" onPress={() => this.props.setLanguage("en")} />
                <Button title="ru" onPress={() => this.props.setLanguage("ru")} />
               
                <Text>{this.t('Hello world!')}</Text>
            </View>
        );
    }
}

const mapDispatchToPros = {
    setLanguage
    
};

const mapStateToProps = state => {
    return {
        
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToPros
)(MyComponent)