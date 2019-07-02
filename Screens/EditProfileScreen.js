import React from "react";
import {
    StyleSheet,
    TouchableOpacity
} from "react-native";
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
import { TextField } from 'react-native-material-textfield';
import UniformButton from "../Screens/Components/UniformButton";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';

class EditProfileScreen extends LocalizeComponent {
    constructor(props) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.firstNameRef = this.updateRef.bind(this, 'firstName');
        this.lastNameRef = this.updateRef.bind(this, 'lastName');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.cityRef = this.updateRef.bind(this, 'city');
        this.countryRef = this.updateRef.bind(this, 'country');
        this.phoneRef = this.updateRef.bind(this, 'phone');

        this.state = {
            firstName: "Denys",
            lastName: "Shourek",
            email: "test@gmail.com",
            phone: "+380973122522",
            birthDate: "1992-11-03T15:27:31.2278615+03:00",
            city: "Lviv",
            country: "Ukraine",
            isDateTimePickerVisible: false
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
        ['firstName', 'lastName', 'email', 'city', 'country', 'phone']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    validateEmail(email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return email.match(mailformat) ? true : false;
    }

    validatePhone(phone) {
        var phoneFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phone.match(phoneFormat) ? true : false;
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    onSubmit() {
        let errors = {};
        ['firstName', 'lastName', 'email', 'city', 'country', 'phone']
            .forEach((name) => {
                let value = this[name].value();
                if (!value) {
                    errors[name] = this.t('Should not be empty');
                } else {
                    if ('email' === name && !this.validateEmail(value)) {
                        errors[name] = this.t('Invalid email address');
                    }
                    if ('phone' === name && !this.validatePhone(value)) {
                        errors[name] = this.t('Invalid phone number');
                    }
                }
            });
        this.setState({ errors });
        if (this.isEmpty(errors)) {
            // TODO: fetch password update to server
            alert('FETCH');
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    convertBirthDate() {
        var date = new Date(this.state.birthDate);
        var stringDate = ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
            + date.getFullYear();
        return stringDate
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({ birthDate: date })
        this.hideDateTimePicker();
    };

    render() {
        let { errors = {} } = this.state;
        return (
            <Container>
                <ReturnMenuIcon
                    onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())}
                    showBody={true}
                    text={'Edit profile'}
                />
                <Header style={styles.headerContainer}>
                    <FontAwesome name='user-circle' style={styles.iconsContainer} />
                    <Text style={styles.optionTitleWhite}>
                        {`${this.state.firstName}` +
                            `${this.state.lastName !== null ? ` ${this.state.lastName}` : ""}`}
                    </Text>
                </Header>
                <Content contentContainerStyle={styles.contentContainer} style={styles.container}>
                    <TextField
                        ref={this.firstNameRef}
                        value={this.state.firstName}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={false}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        returnKeyType='done'
                        label={this.t('First Name')}
                        error={errors.firstName}
                        tintColor={'#7154b8'}
                        fontSize={18}
                        style={{ fontFamily: 'Arsenal-Regular' }}
                        labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                        titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
                    />
                    <TextField
                        ref={this.lastNameRef}
                        value={this.state.lastName !== null ? this.state.lastName : ''}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={false}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        returnKeyType='done'
                        label={this.t('Last Name')}
                        error={errors.lastName}
                        tintColor={'#7154b8'}
                        fontSize={18}
                        style={{ fontFamily: 'Arsenal-Regular' }}
                        labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                        titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
                    />
                    <TextField
                        ref={this.emailRef}
                        value={this.state.email}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={false}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        keyboardType={"email-address"}
                        returnKeyType='done'
                        label={this.t('Email')}
                        error={errors.email}
                        tintColor={'#7154b8'}
                        fontSize={18}
                        style={{ fontFamily: 'Arsenal-Regular' }}
                        labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                        titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
                    />
                    <TextField
                        ref={this.phoneRef}
                        value={this.state.phone}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={false}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        keyboardType={"phone-pad"}
                        returnKeyType='done'
                        label={this.t('Phone')}
                        error={errors.phone}
                        tintColor={'#7154b8'}
                        fontSize={18}
                        style={{ fontFamily: 'Arsenal-Regular' }}
                        labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                        titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
                    />
                    <TouchableOpacity onPress={this.showDateTimePicker}>
                        <TextField
                            value={this.convertBirthDate()}
                            autoCapitalize='none'
                            label={this.t('Birth Date')}
                            editable={false}
                            tintColor={'#7154b8'}
                            fontSize={18}
                            style={{ fontFamily: 'Arsenal-Regular' }}
                            labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                            titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
                        />
                        <DateTimePicker
                            locale={this.props.languageCode}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            date={new Date(this.state.birthDate)}
                            titleIOS={this.t('Birth Date')}
                            confirmTextIOS={this.t('Confirm')}
                            cancelTextIOS={this.t('Cancel')}
                            datePickerModeAndroid={'spinner'}
                            minimumDate={new Date('1900-01-01')}
                            maximumDate={new Date()}
                        />
                    </TouchableOpacity>
                    <TextField
                        ref={this.cityRef}
                        value={this.state.city}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={false}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        returnKeyType='done'
                        label={this.t('City')}
                        error={errors.city}
                        tintColor={'#7154b8'}
                        fontSize={18}
                        style={{ fontFamily: 'Arsenal-Regular' }}
                        labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                        titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
                    />
                    <TextField
                        ref={this.countryRef}
                        value={this.state.country}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        clearTextOnFocus={false}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        returnKeyType='done'
                        label={this.t('Country')}
                        error={errors.country}
                        tintColor={'#7154b8'}
                        fontSize={18}
                        style={{ fontFamily: 'Arsenal-Regular' }}
                        labelTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 18 }}
                        titleTextStyle={{ fontFamily: 'Arsenal-Regular', fontSize: 14 }}
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
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        alignSelf: "flex-end"
    },
});

const mapStateToProps = state => ({
    languageCode: state.settings.settings.languageCode
});

export default connect(mapStateToProps)(EditProfileScreen);
