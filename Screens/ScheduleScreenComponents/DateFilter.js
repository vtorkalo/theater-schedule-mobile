import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { loadSchedule } from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionCreators';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import CustomButton from '../Components/CustomButton';
import moment from 'moment';

class DateFilter extends LocalizedComponent {
    constructor(props) {
        super(props);

        this.state = {
            isFilterVisible: false,
        }
    }

    convertToReadableDate = date => {
        return moment(date).format("DD.MM.YYYY");
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
        this.props.loadSchedule(startDate, endDate, this.props.languageCode);
    }

    render() {
        return (
            <View style={styles.filterContainer} >
                <CustomButton text="1 week" style={styles.button}></CustomButton>
                <CustomButton text="2 weeks" style={styles.button}></CustomButton>
                <CustomButton text="1 month" style={styles.button}></CustomButton>
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
        fontSize: 20,
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
