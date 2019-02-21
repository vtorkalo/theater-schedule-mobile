import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import PerformanceList from 'TheaterSchedule/Screens/ScheduleScreenComponents/PerformanceList'
import DateFilter from 'TheaterSchedule/Screens/ScheduleScreenComponents/DateFilter';
import { loadSchedule } from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionCreators'
import LocalizeComponent from "../Localization/LocalizedComponent";

const getDateAfterWeek = () => {
    let currentDate = new Date();
    const DAYS_IN_WEEK = 7;
    let dateAfterWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + DAYS_IN_WEEK);
    return dateAfterWeek;
}

class ScheduleScreen extends LocalizeComponent  {
    static navigationOptions = ({ navigation }) => {
        return {
          drawerIcon: (<MaterialCommunityIcons name="calendar-clock" size={25} />),
          title: navigation.getParam("scheduleScreenTitle", "Schedule_Screen")
        };
      };
    componentDidMount() {
        if (this.props.deviceId && this.props.languageCode) {
            let currentDate = new Date();
            this.props.loadSchedule(currentDate, getDateAfterWeek(), this.props.languageCode);
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.languageCode && this.props.languageCode) ||
            (prevProps.languageCode !== this.props.languageCode)) {
            let currentDate = new Date();
            this.props.loadSchedule(currentDate, getDateAfterWeek(), this.props.languageCode);
            this.props.navigation.setParams({ scheduleScreenTitle: this.t("ScheduleScreenTitle") });
        }
    }

    render() {
        if (this.props.isScheduleLoading || this.props.isLanguageLoading) {
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
                            <PerformanceList navigation={this.props.navigation} />
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
        isScheduleLoading: state.scheduleReducer.loading,
        isLanguageLoading: state.settings.loading,
        languageCode: state.settings.settings.languageCode,
    }
}

const mapDispatchToProps = {
    loadSchedule,
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
