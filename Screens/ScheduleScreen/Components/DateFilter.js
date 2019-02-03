import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import {filterPerformances} from '../../../Actions/ScheduleActions/ScheduleActionCreators';

import { Ionicons } from '@expo/vector-icons';
import DateRangePicker from './DateRangePicker'

class DateFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilterVisible: false,
        }
    }

    convertToReadableFormat = date => {
        return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }

    pressMenuIconHandler = () => {
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

        this.props.onFilter(startDate, endDate);
    }

    render() {
        return (
            <View style={styles.filterContainer} >
                <DateRangePicker
                    isVisible={this.state.isFilterVisible}
                    onCancel={this.cancelFilteringHandler}
                    onConfirm={this.confirmFilteringHandler}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate} />
                <Text
                    style={styles.text}>
                    Current dates: {this.convertToReadableFormat(this.props.startDate)} - {this.convertToReadableFormat(this.props.endDate)}
                </Text>
                <View style={styles.icon}>
                    <Ionicons
                        name='ios-options'
                        color='#7154b8'
                        size={32}
                        onPress={this.pressMenuIconHandler} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
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

const mapDispatchToProps = dispatch => {
    return {
        onFilter: (startDate, endDate) => dispatch(filterPerformances(startDate, endDate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter);
