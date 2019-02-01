import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import PerformanceList from './Components/PerformanceList'
import { filterPerformances } from '../../Actions/ScheduleActions/ScheduleActionCreators'

class ScheduleScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='calendar-clock' size={25} />
    }

    filterPerformancesHandler = (startDate, endDate) => {
        this.props.onFilter(startDate, endDate);
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity onPress={this.filterPerformancesHandler}>
                        <Text>Filter</Text>
                    </TouchableOpacity>
                    <PerformanceList
                        performances={this.props.performances}
                    />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
    },
});

const mapStateToProps = state => {
    return {
        performances: state.schedule.performances
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFilter: (startDate, endDate) => dispatch(filterPerformances(startDate, endDate)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
