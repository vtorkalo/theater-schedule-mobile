import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import PerformanceItem from 'TheaterSchedule/Screens/ScheduleScreenComponents/PerformanceItem';

class PerformanceList extends Component {
    render() {
        return (
            <FlatList
                style={styles.performanceList}
                data={this.props.performances}
                keyExtractor={item => item.scheduleId.toString()}
                renderItem={({ item }) => (
                    <PerformanceItem performance={item} />
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
        performances: state.scheduleReducer.performances,
    }
}

export default connect(mapStateToProps)(PerformanceList);
