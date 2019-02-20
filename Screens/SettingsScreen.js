import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header  from './SettingsScreenComponents/Header';
import ChooseLanguage from './SettingsScreenComponents/ChooseLanguage';

class SettingsScreen extends Component {
    static navigationOptions = ({screenProps})=> {
        return {
            drawerIcon: (<MaterialCommunityIcons name='settings-box' size={25} />),
            title: screenProps.SettingsScreenTitle,
        }
    }  

    render() {
        return (
            <Container>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <Header/>                    
                    <ChooseLanguage/>                    
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
})

export default SettingsScreen;
