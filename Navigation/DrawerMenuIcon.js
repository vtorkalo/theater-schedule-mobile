import React from 'react';
import { StyleSheet } from 'react-native';
import { Left, Header, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Text from '../Screens/Components/CustomText'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import LocalizeComponent from "../Localization/LocalizedComponent";

class DrawerMenuIcon extends LocalizeComponent {
    _menu = null;
    setMenuRef = ref => { this._menu = ref; };
    hideMenu = () => { this._menu.hide(); };
    showMenu = () => { this._menu.show(); };

    render() {
    if (this.props.showSettingsIcon) {
        return (
            <Header style={styles.headerContainer} >
                <Left style={styles.leftContainer}>
                    <Ionicons name='ios-menu' color='white' size={32} onPress={this.props.onPressMenuIcon} />
                </Left>
                <Body style={styles.bodyContainer}>
                    <Text type="bold" style={styles.text}>{this.props.text}</Text>
                </Body>
                <Right style={styles.rightContainer}>
                    <Menu
                        ref={this.setMenuRef}
                        button={<Ionicons name='ios-settings' color='white' size={32} onPress={this.showMenu} />}>
                        <MenuItem
                            onPress={() => { this.hideMenu(); this.props.itemsClicks.editItemClick(); }}
                            textStyle={{ color: 'black', fontSize: 16 }}>
                            {this.t("Edit profile")}
                        </MenuItem>
                        <MenuItem 
                            onPress={() => { this.hideMenu(); this.props.itemsClicks.changePasswordItemClick(); }}
                            textStyle={{ color: 'black', fontSize: 16 }}>
                            {this.t("Change password")}
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem 
                            onPress={() => { this.hideMenu(); this.props.itemsClicks.logoutItemClick(); }}
                            textStyle={{ color: 'red', fontSize: 16 }}>
                            {this.t("Logout")}
                        </MenuItem>
                    </Menu>
                </Right>
            </Header>
        )
    }
    else {
        return (
            <Header style={styles.headerContainer} >
                <Left style={styles.leftContainer}>
                    <Ionicons name='ios-menu' color='white' size={32} onPress={this.props.onPressMenuIcon} />
                </Left>
                <Body style={styles.bodyContainer}>
                    <Text type="bold" style={styles.text}>{this.props.text}</Text>
                </Body>
                <Right style={styles.rightContainer} />
            </Header>
        )
    }}
}

export default DrawerMenuIcon;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#7154b8',
        borderColor: '#7154b8',
        borderBottomWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0
    },
    leftContainer: {
        flex: 1,
    },
    bodyContainer: {
        flex: 6,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
    },
    text: {
        color: '#fff',
        fontSize: 26,
        textAlign: 'center',
    },
})