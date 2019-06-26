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
        currentUser: {
            firstName: "Stepan",
            lastName: "Popidsrachenko",
            email: "testuser@gmail.com",
            birthDate: "2019-06-26T15:27:31.2278615+03:00",
            city: "Lviv",
            country: "Ukraine",
        }
    }

    convertBirthDate() {
        var dt = new Date(this.state.currentUser.birthDate);
        var day = dt.getDate(),
            month = dt.getMonth() + 1,
            year = dt.getFullYear();
        return `${day}-${month}-${year}`
    }

    editProfileItemClick = () => { 
        //TODO: Navigate to EditProfileScreen
    }

    changePasswordItemClick = () => {
        //TODO: Navigate to ChangePasswordScreen
    }

    logoutItemClick = () => {
        //TODO: Delete current user from local storage, navigate to LoginScreen
    }

    settingsMenuItemsClicks = {
        editItemClick: this.editProfileItemClick,
        changePasswordItemClick: this.changePasswordItemClick,
        logoutItemClick: this.logoutItemClick,
    }

    render() {
        return (
            <Container>
                <DrawerMenucIcon
                    onPressMenuIcon={() => this.props.navigation.openDrawer()}
                    text={this.t('Profile')}
                    showSettingsIcon={true}
                    itemsClicks={this.settingsMenuItemsClicks}
                />
                <Header style={styles.headerContainer}>
                    <FontAwesome name='user-circle' style={styles.iconsContainer} />
                    <Text style={styles.optionTitleWhite}>
                        {`${this.state.currentUser.firstName}` + 
                        `${this.state.currentUser.lastName !== null ? ` ${this.state.currentUser.lastName}` : ""}`}
                    </Text>
                </Header>
                <Content contentContainerStyle={styles.contentContainer}>
                    <ListItem>
                        <Left style={{ flex: 0.4 }}>
                            <Text style={styles.optionTitleBlack}>{this.t("Email")}</Text>
                        </Left>
                        <Right style={{ flex: 0.6 }}>
                            <Text style={styles.optionTitleBlack}>{this.state.currentUser.email}</Text>
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
                            <Text style={styles.optionTitleBlack}>{this.state.currentUser.city}</Text>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left style={{ flex: 0.4 }}>
                            <Text style={styles.optionTitleBlack}>{this.t("Country")}</Text>
                        </Left>
                        <Right style={{ flex: 0.6 }}>
                            <Text style={styles.optionTitleBlack}>{this.state.currentUser.country}</Text>
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
