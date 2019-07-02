import React from "react";
import { StyleSheet } from "react-native";
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import LocalizeComponent from "../Localization/LocalizedComponent";
import {
    Container,
    Content,
    Header
} from "native-base";
import Text from './Components/CustomText';
import { FontAwesome } from '@expo/vector-icons';
import UserProfileItem from './UserProfileComponents/UserProfileItem';

class UserProfileScreen extends LocalizeComponent {
    static navigationOptions = {
        drawerLabel: () => null
    }

    state = {
        firstName: "Denys",
        lastName: "Shourek",
        email: "test@gmail.com",
        phone: "+380973122522",
        birthDate: "1992-11-03T15:27:31.2278615+03:00",
        city: "Lviv",
        country: "Ukraine",
    }

    convertBirthDate(dateToConvert) {
        var date = new Date(dateToConvert);
        var stringDate = ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
            + date.getFullYear();
        return stringDate
    }

    editProfileItemClick = () => {
        this.props.navigation.navigate('EditProfile')
    }

    changePasswordItemClick = () => {
        this.props.navigation.navigate('ChangePassword')
    }

    logoutItemClick = () => {
        //TODO: Delete current user from local storage, navigate to LoginScreen
    }

    settingsMenuItems = {
        item1: {
            text: 'Edit profile',
            click: this.editProfileItemClick,
        },
        item2: {
            text: 'Change password',
            click: this.changePasswordItemClick,
        },
        item3: {
            text: 'Logout',
            click: this.logoutItemClick,
        }
    }

    render() {
        return (
            <Container>
                <DrawerMenucIcon
                    onPressMenuIcon={() => this.props.navigation.openDrawer()}
                    text={this.t('Profile')}
                    showSettingsIcon={true}
                    items={this.settingsMenuItems}
                />
                <Header style={styles.headerContainer}>
                    <FontAwesome name='user-circle' style={styles.iconsContainer} />
                    <Text style={styles.optionTitleWhite}>
                        {`${this.state.firstName}` +
                            `${this.state.lastName !== null ? ` ${this.state.lastName}` : ""}`}
                    </Text>
                </Header>
                <Content contentContainerStyle={styles.contentContainer}>
                    <UserProfileItem text={this.t("Email")} value={this.state.email} />
                    <UserProfileItem text={this.t("Phone")} value={this.state.phone} />
                    <UserProfileItem text={this.t("Birth Date")} value={this.convertBirthDate(this.state.birthDate)} />
                    <UserProfileItem text={this.t("City")} value={this.state.city} />
                    <UserProfileItem text={this.t("Country")} value={this.state.country} />
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
    },
    optionTitleWhite: {
        color: 'white',
        fontSize: 20,
    },
});

export default UserProfileScreen;
