import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PerformanceList from './Components/PerformanceList'

export default class ScheduleScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='calendar-clock' size={25} />
    }
    
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <PerformanceList />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
    },
})
