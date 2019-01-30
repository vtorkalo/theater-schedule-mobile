import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class ScheduleScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='calendar-clock' size={25} />
    }
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <Text>Schedule</Text>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
