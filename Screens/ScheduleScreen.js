import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import PerformanceList from 'TheaterSchedule/Screens/ScheduleScreenComponents/PerformanceList'
import DateFilter from 'TheaterSchedule/Screens/ScheduleScreenComponents/DateFilter';
import { loadSchedule } from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionCreators';
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

class ScheduleScreen extends LocalizeComponent {
    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name="calendar-clock" size={25} />),
            title: screenProps.ScheduleScreenTitle,
        };
    };
    componentDidMount() {
        if (this.props.languageCode) {
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
                        <View style={styles.filterContainer}>
                            <DateFilter disabled={true} />
                        </View>
                        <View style={styles.indicator}>
                            <BallIndicator color="#aaa" />
                        </View>
                        <View style={styles.backgroundPerformancesContainer}>
                            {this.props.isScheduleEmpty
                                ? null
                                : <PerformanceList navigation={this.props.navigation} />}
                        </View>
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
                            <DateFilter disabled={false} />
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
        backgroundColor: '#BFD0D670'
    },
    filterContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 5,
        marginBottom: 0,
    },
    performancesContainer: {
        flex: 12,
    },
    backgroundPerformancesContainer: {
        flex: 12,
        opacity: 0.3,
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        zIndex: 10,
    }
});

const mapStateToProps = state => {
    return {
        isScheduleLoading: state.scheduleReducer.loading,
        isLanguageLoading: state.settings.loading,
        languageCode: state.settings.settings.languageCode,
        isScheduleEmpty: state.scheduleReducer.schedule.length == 0,
    }
}

const mapDispatchToProps = {
    loadSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
