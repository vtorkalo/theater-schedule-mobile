import React from "react";
import { StyleSheet, AsyncStorage } from "react-native";
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
import BASE_URL from 'TheaterSchedule/baseURL';

class UserProfileScreen extends LocalizeComponent {
    static navigationOptions = {
        drawerLabel: () => null
    }

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        city: '',
        country: '',
    }

    async componentDidMount() {
        await this.getValuesFromStorage();
    }

    getValuesFromStorage = () => {
        let keys = ['FirstName', 'LastName', 'Email', 'PhoneNumber', 'DateOfBirth', 'City', 'Country'];
        AsyncStorage.multiGet(keys).then(result => {
            this.setState({
                firstName: result[0][1].trim(),
                lastName: result[1][1].trim(),
                email: result[2][1].trim(),
                phone: result[3][1].trim(),
                birthDate: result[4][1],
                city: result[5][1].trim(),
                country: result[6][1].trim()
            });
        });
    }

    convertBirthDate(dateToConvert) {
        var date = new Date(dateToConvert);
        var stringDate = ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
            + date.getFullYear();
        return stringDate;
    }

    handleOnNavigateBack = (data) => {
        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            birthDate: data.birthDate,
            city: data.city,
            country: data.country,
        })
    }

    editProfileItemClick = () => {
        this.props.navigation.navigate('EditProfile', {
            onNavigateBack: this.handleOnNavigateBack
        })
    }

    changePasswordItemClick = () => {
        this.props.navigation.navigate('ChangePassword')
    }

    logoutItemClick = async () => {
        await AsyncStorage.getItem('RefreshToken')
            .then((token) => {
                let dataJson = JSON.stringify({ RefreshToken: token });
                return fetch(`${BASE_URL}RefreshToken`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: dataJson
                })
            })
            .then(async () => await AsyncStorage.clear()
                .then(() => console.log("Async Storage keys deleted")))
            .then(() => this.props.navigation.navigate("Authorization"))
            .catch((error) => console.error(error));
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
