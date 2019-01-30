import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class SettingsScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='settings-box' size={25} />
    }

    render() {
        return (
            <Container>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Settings</Text>
                </Content>
            </Container>
        )
    }
}