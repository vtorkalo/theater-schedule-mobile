import React, { Component } from "react";
import { TextField } from 'react-native-material-textfield';

class PasswordTextField extends Component {
    render() {
        return (
            <TextField
                label={this.props.label}
                ref={this.props.reference}
                value={this.props.value}
                onFocus={this.props.onFocus}
                onChangeText={this.props.onChangeText}
                onSubmitEditing={this.props.onSubmitEditing}
                error={this.props.error}
                secureTextEntry={true}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                returnKeyType='next'
                tintColor={'#7154b8'}
                fontSize={18}
                labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
            />
        )
    }
}

export default PasswordTextField;