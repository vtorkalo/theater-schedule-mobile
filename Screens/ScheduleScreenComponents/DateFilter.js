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
            activeButton: "WEEK",
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

    loadScheduleForPeriod = (period, endDate) => {
        this.setState({
            activeButton: period,
        })
        this.props.loadSchedule(
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
                    style={this.state.activeButton == "WEEK"
                        ? styles.activeButton
                        : styles.button}
                    textStyle={this.state.activeButton == "WEEK"
                        ? styles.activeTextStyle
                        : styles.textStyle}
                    disabled={this.state.activeButton == "WEEK"}
                    onPress={() => { this.loadScheduleForPeriod("WEEK", this.getDateAfterWeek()) }} />
                <CustomButton
                    text={this.t("2 weeks")}
                    style={this.state.activeButton == "FORTNIGHT"
                        ? styles.activeButton
                        : styles.button}
                    textStyle={this.state.activeButton == "FORTNIGHT"
                        ? styles.activeTextStyle
                        : styles.textStyle}
                    disabled={this.state.activeButton == "FORTNIGHT"}
                    onPress={() => { this.loadScheduleForPeriod("FORTNIGHT", this.getDateAfterFortnight()) }} />
                <CustomButton
                    text={this.t("1 month")}
                    style={this.state.activeButton == "MONTH"
                        ? styles.activeButton
                        : styles.button}
                    textStyle={this.state.activeButton == "MONTH"
                        ? styles.activeTextStyle
                        : styles.textStyle}
                    disabled={this.state.activeButton == "MONTH"}
                    onPress={() => { this.loadScheduleForPeriod("MONTH", this.getDateAfterMonth()) }} />
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
        backgroundColor: '#7154b8',
    },
    activeButton: {
        width: '30%',
        height: '100%',
        backgroundColor: '#f9c20c',
    },
    textStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    activeTextStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
    },
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
