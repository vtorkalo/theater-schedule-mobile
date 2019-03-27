import React, { Component } from 'react';
import { Text } from 'react-native';

export default class CustomText extends Component {

    setFontType = (type) => {
        switch (type) {
            case 'bold':
                return 'Arsenal-Bold';
            case 'italic':
                return 'Arsenal-Italic';
            default:
                return 'Arsenal-Regular';
        }
    }

    render() {
        const font = this.setFontType(this.props.type ? this.props.type : 'regular')
        const style = [{ fontFamily: font }, this.props.style || {}];
        const allProps = Object.assign({}, this.props, { style: style });
        return <Text {...allProps}>{this.props.children}</Text>;
    }
}