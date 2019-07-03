import React from "react";
import { StyleSheet } from "react-native";
import LocalizeComponent from "../Localization/LocalizedComponent";
import {
    Container,
    Content,
    Header
} from "native-base";
import Text from './Components/CustomText';
import { FontAwesome } from '@expo/vector-icons'
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';
import UniformButton from '../Screens/Components/UniformButton';
import PasswordTextField from './UserProfileComponents/PasswordTextField'

class ChangePasswordScreen extends LocalizeComponent {
    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitOldPassword = this.onSubmitOldPassword.bind(this);
        this.onSubmitNewPassword = this.onSubmitNewPassword.bind(this);
        this.onSubmitConfirmPassword = this.onSubmitConfirmPassword.bind(this);
        this.oldPasswordRef = this.updateRef.bind(this, 'oldPassword');
        this.newPasswordRef = this.updateRef.bind(this, 'newPassword');
        this.confirmPasswordRef = this.updateRef.bind(this, 'confirmPassword');

        this.state = {
            firstName: "Denys",
            lastName: "Shourek",
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        };
    }

    onFocus() {
        let { errors = {} } = this.state;
        for (let name in errors) {
            let ref = this[name];
            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }
        this.setState({ errors });
    }

    onChangeText(text) {
        ['oldPassword', 'newPassword', 'confirmPassword']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onSubmitOldPassword() {
        this.newPassword.focus();
    }

    onSubmitNewPassword() {
        this.confirmPassword.focus();
    }

    onSubmitConfirmPassword() {
        this.confirmPassword.blur();
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    isFieldsValid() {
        let errors = {};
        ['oldPassword', 'newPassword', 'confirmPassword']
            .forEach((name) => {
                let value = this[name].value();
                if (!value || value.replace(/\s/g, '').length < 1) {
                    errors[name] = this.t('Should not be empty');
                } else {
                    if (name === 'confirmPassword' && value !== this.state.newPassword) {
                        errors[name] = this.t('Wrong password');
                    }
                    if (value.length < 6) {
                        errors[name] = this.t('Too short');
                    }
                }
            });
        if (this.isEmpty(errors)) {
            return true;
        }
        else {
            this.setState({errors});
            return false;
        }  
    }

    onSubmit() {
        if (this.isFieldsValid()) {
            // TODO: fetch password update to server
            alert('Fetching data to backend');
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    render() {
        let { errors = {} } = this.state;
        return (
            <Container>
                <ReturnMenuIcon
                    onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())}
                    showBody={true}
                    text={'Change password'}
                />
                <Header style={styles.headerContainer}>
                    <FontAwesome name='user-circle' style={styles.iconsContainer} />
                    <Text style={styles.optionTitleWhite}>
                        {`${this.state.firstName}` +
                            `${this.state.lastName !== null ? ` ${this.state.lastName}` : ""}`}
                    </Text>
                </Header>
                <Content contentContainerStyle={styles.contentContainer} style={styles.container}>
                    <PasswordTextField 
                        label={this.t('Password')}
                        reference={this.oldPasswordRef}
                        value={this.state.oldPassword}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitOldPassword}
                        error={errors.oldPassword}
                    />
                    <PasswordTextField 
                        label={this.t('New Password')}
                        reference={this.newPasswordRef}
                        value={this.state.newPassword}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitNewPassword}
                        error={errors.newPassword}
                    />
                    <PasswordTextField 
                        label={this.t('Confirm Password')}
                        reference={this.confirmPasswordRef}
                        value={this.state.confirmPassword}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitConfirmPassword}
                        error={errors.confirmPassword}
                    />
                    <UniformButton onPress={this.onSubmit} text={this.t("Save")} style={styles.button} />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 100,
        backgroundColor: '#7154b8',
        borderColor: '#7154b8',
        borderBottomWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0,
    },
    iconsContainer: {
        fontSize: 50,
        color: 'white'
    },
    contentContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 8,
    },
    container: {
        margin: 8,
    },
    optionTitleWhite: {
        color: 'white',
        fontSize: 20,
    },
    optionTitleBlack: {
        color: 'black',
        fontSize: 20,
    },
    button: {
        marginTop: 20,
        alignSelf: "flex-end"
    },
});

export default ChangePasswordScreen;
