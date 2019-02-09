import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { filterPerformances } from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionCreators';
import DateRangePicker from 'TheaterSchedule/Screens/ScheduleScreenComponents/DateRangePicker';
import LocalizeComponent from 'TheaterSchedule/Localization/LocalizedComponent';

class DateFilter extends LocalizeComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFilterVisible: false,
        }
    }

    convertToReadableDate = date => {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    pressFilterIconHandler = () => {
        this.setState({
            isFilterVisible: true,
        });
    }

    cancelFilteringHandler = () => {
        this.setState({
            isFilterVisible: false,
        });
    }

    confirmFilteringHandler = (startDate, endDate) => {
        this.setState({
            isFilterVisible: false,
        });

        this.props.filterPerformances(startDate, endDate);
    }

    render() {
        return (
            <View style={styles.filterContainer} >
                <View style={styles.filter}>
                    <DateRangePicker
                        isVisible={this.state.isFilterVisible}
                        onCancel={this.cancelFilteringHandler}
                        onConfirm={this.confirmFilteringHandler}
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                    />
                </View>
                <Text
                    style={styles.text}>
                    {this.t('Current dates')}: {this.convertToReadableDate(this.props.startDate)} - {this.convertToReadableDate(this.props.endDate)}
                </Text>
                <View style={styles.icon}>
                    <Ionicons
                        name='ios-options'
                        color='#7154b8'
                        size={32}
                        onPress={this.pressFilterIconHandler} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    filter: {
        width: '0%',
    },
    text: {
        textAlign: 'center',
        color: '#7154b8',
        fontSize: 17,
    },
    icon: {
        borderLeftColor: '#ccc',
        borderLeftWidth: 2,
        paddingLeft: 5,
        margin: 2,
    },
});

const mapStateToProps = state => {
    return {
        startDate: state.scheduleReducer.startDate,
        endDate: state.scheduleReducer.endDate,
    }
}

const mapDispatchToProps = {
    filterPerformances,
}

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter);
