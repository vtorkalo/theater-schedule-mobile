import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { loadSchedule } from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionCreators';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import CustomButton from '../Components/CustomButton';

class DateFilter extends LocalizedComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFilterVisible: false,
        }
    }

    getDateAfterMonth = () => {
        let currentDate = new Date();
        const DAYS_IN_MONTH = 30;
        let dateAfterMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + DAYS_IN_MONTH);

        return dateAfterMonth;
    }

    getDateAfterWeek = () => {
        let currentDate = new Date();
        const DAYS_IN_WEEK = 7;
        let dateAfterWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + DAYS_IN_WEEK);

        return dateAfterWeek;
    }

    getDateAfterFortnight = () => {
        let currentDate = new Date();
        const DAYS_IN_FORTNIGHT = 14;
        let getDateAfterFortnight = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + DAYS_IN_FORTNIGHT);

        return getDateAfterFortnight;
    }

    loadScheduleForPeriod = (endDate) => {
        this.props.loadSchedule(
            new Date(),
            endDate,
            this.props.languageCode);
    }

    render() {
        return (
            <View
                style={styles.filterContainer}
                pointerEvents={this.props.disabled ? "none" : "auto"}>
                <CustomButton
                    text={this.t("1 week")}
                    style={styles.button}
                    onPress={() => { this.loadScheduleForPeriod(this.getDateAfterWeek()) }} />
                <CustomButton
                    text={this.t("2 weeks")}
                    style={styles.button}
                    onPress={() => { this.loadScheduleForPeriod(this.getDateAfterFortnight()) }} />
                <CustomButton
                    text={this.t("1 month")}
                    style={styles.button}
                    onPress={() => { this.loadScheduleForPeriod(this.getDateAfterMonth()) }} />
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
    button: {
        width: '30%',
        height: '100%',
        borderRadius: 10,
        fontSize: 18,
    }
});

const mapStateToProps = state => {
    return {
        startDate: state.scheduleReducer.startDate,
        endDate: state.scheduleReducer.endDate,
        languageCode: state.settings.settings.languageCode,
    }
}

const mapDispatchToProps = {
    loadSchedule,
}

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter);
