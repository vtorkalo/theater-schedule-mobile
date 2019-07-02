import React from "react";
import { StyleSheet } from "react-native";
import DrawerMenucIcon from "../Navigation/DrawerMenuIcon";
import LocalizeComponent from "../Localization/LocalizedComponent";
import {
    Container,
    Content,
    Left,
    Right,
    ListItem,
    Header
} from "native-base";
import Text from './Components/CustomText';
import { FontAwesome } from '@expo/vector-icons'

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

    convertBirthDate() {
        var date = new Date(this.state.birthDate);
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
                    <ListItem>
                        <Left style={{ flex: 0.4 }}>
                            <Text style={styles.optionTitleBlack}>{this.t("Email")}</Text>
                        </Left>
                        <Right style={{ flex: 0.6 }}>
                            <Text style={styles.optionTitleBlack}>{this.state.email}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left style={{ flex: 0.4 }}>
                            <Text style={styles.optionTitleBlack}>{this.t("Phone")}</Text>
                        </Left>
                        <Right style={{ flex: 0.6 }}>
                            <Text style={styles.optionTitleBlack}>{this.state.phone}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left style={{ flex: 0.4 }}>
                            <Text style={styles.optionTitleBlack}>{this.t("Birth Date")}</Text>
                        </Left>
                        <Right style={{ flex: 0.6 }}>
                            <Text style={styles.optionTitleBlack}>
                                {this.convertBirthDate()}
                            </Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left style={{ flex: 0.4 }}>
                            <Text style={styles.optionTitleBlack}>{this.t("City")}</Text>
                        </Left>
                        <Right style={{ flex: 0.6 }}>
                            <Text style={styles.optionTitleBlack}>{this.state.city}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left style={{ flex: 0.4 }}>
                            <Text style={styles.optionTitleBlack}>{this.t("Country")}</Text>
                        </Left>
                        <Right style={{ flex: 0.6 }}>
                            <Text style={styles.optionTitleBlack}>{this.state.country}</Text>
                        </Right>
                    </ListItem>
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
    optionTitleBlack: {
        color: 'black',
        fontSize: 20,
    },
});

export default UserProfileScreen;
