import React, { Component } from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import PerformanceItem from 'TheaterSchedule/Screens/ScheduleScreenComponents/PerformanceItem';

class PerformanceList extends Component {
    render() {
        return (
            <FlatList
                style={styles.performanceList}
                data={this.props.schedule}
                keyExtractor={item => item.scheduleId.toString()}
                renderItem={({ item }) => (
                    <PerformanceItem performance={item} navigation={this.props.navigation}/>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    performanceList: {
        width: '100%',
    },
});

const mapStateToProps = state => {
    return {
        schedule: state.scheduleReducer.schedule,
    }
}

export default connect(mapStateToProps)(PerformanceList);
