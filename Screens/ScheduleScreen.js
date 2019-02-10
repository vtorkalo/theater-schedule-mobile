import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';

import PerformanceList from 'TheaterSchedule/Screens/ScheduleScreenComponents/PerformanceList'
import DateFilter from 'TheaterSchedule/Screens/ScheduleScreenComponents/DateFilter';
import { loadPerformances } from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionCreators'

class ScheduleScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='calendar-clock' size={25} />
    }

    componentWillMount() {
        const DAYS_IN_WEEK = 7;

        let currentDate = new Date();
        let dateAfterWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + DAYS_IN_WEEK);

        this.props.loadPerformances(currentDate, dateAfterWeek, this.props.languageCode);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <BallIndicator color="#aaa" />
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <View style={styles.filterContainer}>
                            <DateFilter />
                        </View>
                        <View style={styles.performancesContainer}>
                            <PerformanceList />
                        </View>
                    </Content>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        isLoading: state.scheduleReducer.loading,
        languageCode: state.settings.settings.languageCode,
    }
}

const mapDispatchToProps = {
    loadPerformances,
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
