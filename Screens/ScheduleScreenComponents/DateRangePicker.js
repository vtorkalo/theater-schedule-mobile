import React from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';

import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';

class DateRangePicker extends LocalizedComponent {
    constructor(props) {
        super(props);
        this.state = {
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,

            startFilterDate: this.props.startDate,
            endFilterDate: this.props.endDate,
        }
    }

    convertDateToReadableDate = date => {
        let filterDate = new Date(date);
        return `${filterDate.getDate()}.${filterDate.getMonth() + 1}.${filterDate.getFullYear()}`;
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
            startFilterDate: date,
        });

        this.hideStartDatePicker();
    }

    handleEndDatePicked = (date) => {
        this.setState({
            endFilterDate: date,
        });

        this.hideEndDatePicker();
    }

    cancelHandler = () => {
        this.props.onCancel();
    }

    confirmHandler = () => {
        this.props.onConfirm(this.state.startFilterDate, this.state.endFilterDate);
    }

    render() {
        return (
            <Modal
                onRequestClose={() => { this.onCancel }}
                visible={this.props.isVisible}
                animationType="fade"
            >
                <View style={styles.container}>
                    {/* start date modal picker */}
                    <DateTimePicker
                        isVisible={this.state.isStartDatePickerVisible}
                        onConfirm={this.handleStartDatePicked}
                        onCancel={this.hideStartDatePicker}
                        mode="date"
                        datePickerModeAndroid="spinner"
                        minimumDate={this.props.startDate}
                        maximumDate={this.state.endFilterDate}
                        date={this.state.startFilterDate}
                    />

                    {/* end date modal picker */}
                    <DateTimePicker
                        isVisible={this.state.isEndDatePickerVisible}
                        onConfirm={this.handleEndDatePicked}
                        onCancel={this.hideEndDatePicker}
                        mode="date"
                        datePickerModeAndroid="spinner"
                        minimumDate={this.state.startFilterDate}
                        date={this.state.endFilterDate}
                    />

                    {/* buttons for choosing start and end dates */}
                    <View style={styles.datesSelectorContainer}>
                        <View style={[styles.editRangeButton, { borderBottomColor: '#7154b8', borderBottomWidth: 1, paddingBottom: 10 }]}>
                            <Text style={styles.text}>
                                {this.t('From')}: {this.convertDateToReadableDate(this.state.startFilterDate)}
                            </Text>
                            <View style={styles.icon}>
                                <Ionicons
                                    name='md-create'
                                    color='#7154b8'
                                    size={32}
                                    onPress={this.showStartDatePicker}
                                />
                            </View>
                        </View>
                        <View style={[styles.editRangeButton, { marginTop: 0 }]}>
                            <Text style={styles.text}>
                                {this.t('To')}: {this.convertDateToReadableDate(this.state.endFilterDate)}
                            </Text>
                            <View style={styles.icon}>
                                <Ionicons
                                    name='md-create'
                                    color='#7154b8'
                                    size={32}
                                    onPress={this.showEndDatePicker}
                                />
                            </View>
                        </View>
                    </View>

                    {/* buttons for saving or canceling new date range */}
                    <View style={styles.saveCancelButtonsContainer}>
                        <Ionicons
                            name='ios-close-circle'
                            color='#7154b8'
                            size={70}
                            onPress={this.cancelHandler} />
                        <Ionicons
                            name='ios-checkmark-circle'
                            color='#7154b8'
                            size={70}
                            onPress={this.confirmHandler} />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    datesSelectorContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    text: {
        color: '#7154b8',
        fontSize: 25,
    },
    icon: {
        borderLeftColor: '#ccc',
        borderLeftWidth: 2,
        paddingLeft: 5,
        margin: 2,
    },
    editRangeButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    saveCancelButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
    },
});

export default connect()(DateRangePicker);
