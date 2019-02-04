import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenuIcon from '../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import PerformanceList from './ScheduleScreenComponents/PerformanceList'

import DateFilter from './ScheduleScreenComponents/DateFilter';

import { filterPerformances } from '../Actions/ScheduleActions/ScheduleActionCreators'

class ScheduleScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='calendar-clock' size={25} />
    }

    componentWillMount() {
        let currentDate = new Date();
        let dateAfterWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        this.props.onFilter(currentDate, dateAfterWeek);
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <View style={styles.filterContainer}>
                        <DateFilter
                            startDate={this.props.startDate}
                            endDate={this.props.endDate} />
                    </View>
                    <View style={styles.performancesContainer}>
                        <PerformanceList
                            performances={this.props.performances}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
    filterContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: '#7154b8',
        borderWidth: 2,
        margin: 5,
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    performancesContainer: {
        flex: 12,
    },
});

const mapStateToProps = state => {
    return {
        performances: state.scheduleReducer.performances,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFilter: (startDate, endDate) => dispatch(filterPerformances(startDate, endDate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
