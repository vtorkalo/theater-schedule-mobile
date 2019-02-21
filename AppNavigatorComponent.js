import React, { Component } from "react";
import Navigator from './Navigation/Navigator';
import { connect } from 'react-redux';
import { translations } from "./Localization/translations";

class AppNavigator extends Component {
    render() {
        return (
            <Navigator screenProps={translations[this.props.languageCode]} />
        );
    }
}

const mapStateToProps = state => {
    return {
        languageCode: state.settings.settings.languageCode,
    }
}

export default connect(mapStateToProps)(AppNavigator);