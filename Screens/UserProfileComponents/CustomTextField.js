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
                error={this.props.error}
                secureTextEntry={this.props.secureTextEntry}
                keyboardType={this.props.keyboardType}
                editable={this.props.editable}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                returnKeyType='done'
                tintColor={'#7154b8'}
                fontSize={18}
                style={{ fontFamily: 'Arsenal-Regular' }}
                labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
            />
        )
    }
}

export default PasswordTextField;