import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';

class DateRangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,
        }
    }

    showStartDatePicker = () => {
        this.setState({
            isStartDatePickerVisible: true,
        })
    }

    showEndDatePicker = () => {
        this.setState({
            isEndDatePickerVisible: true,
        })
    }

    hideStartDatePicker = () => {
        this.setState({
            isStartDatePickerVisible: false,
        })
    }

    hideEndDatePicker = () => {
        this.setState({
            isEndDatePickerVisible: false,
        })
    }

    handleStartDatePicked = (date) => {
        this.setState({
            initialStartDate: date,
        });
        this.hideStartDatePicker();
    }

    handleEndDatePicked = (date) => {
        this.setState({
            initialEndDate: date,
        });
        this.hideEndDatePicker();
    }

    render() {
        return (
            <Modal onRequestClose={() => { }} visible={this.props.isVisible} animationType="fade">
                {/* start date modal picker */}
                <DateTimePicker
                    isVisible={this.state.isStartDatePickerVisible}
                    onConfirm={this.handleStartDatePicked}
                    onCancel={this.hideStartDatePicker}
                    mode="date"
                    datePickerModeAndroid="spinner"
                    minimumDate={new Date()}
                    date={this.props.startDate}
                />

                {/* end date modal picker */}
                <DateTimePicker
                    isVisible={this.state.isEndDatePickerVisible}
                    onConfirm={this.handleEndDatePicked}
                    onCancel={this.hideEndDatePicker}
                    mode="date"
                    datePickerModeAndroid="spinner"
                    minimumDate={new Date()}
                    date={this.props.endDate}
                />

                {/* buttons for choosing start and end dates */}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'stretch' }}>
                    <TouchableOpacity style={{ backgroundColor: '#eee', marginTop: 10 }}
                        onPress={this.showStartDatePicker}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Choose start date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#eee', marginTop: 10 }}
                        onPress={this.showEndDatePicker}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Choose end date</Text>
                    </TouchableOpacity>
                </View>

                {/* info about currently selected dates */}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'stretch' }}>
                    <Text>Start date: {this.props.startDate.toString()}</Text>
                    <Text>End date: {this.props.endDate.toString()}</Text>
                </View>

                {/* buttons for saving or canceling new date range */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', alignItems: 'center', position: 'absolute', bottom: 10 }}>
                    <TouchableOpacity onPress={this.props.onCancel}>
                        <Text style={{ color: 'red', fontSize: 18 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.onConfirm(this.props.startDate, this.props.endDate)}>
                        <Text style={{ color: 'blue', fontSize: 18 }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

export default DateRangePicker;
