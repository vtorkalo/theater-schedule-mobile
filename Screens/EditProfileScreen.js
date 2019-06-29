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
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';

class EditProfileScreen extends LocalizeComponent {
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

    render() {
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
                        {`${this.state.currentUser.firstName}` + 
                        `${this.state.currentUser.lastName !== null ? ` ${this.state.currentUser.lastName}` : ""}`}
                    </Text>
                </Header>
                <Content contentContainerStyle={styles.contentContainer}>

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

export default EditProfileScreen;
