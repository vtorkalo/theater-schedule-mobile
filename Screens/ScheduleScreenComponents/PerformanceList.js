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
                    <PerformanceItem performance={item} navigation={this.props.navigation} index={item.index} isChecked={item.isChecked}/>
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
        schedule: state.scheduleReducer.schedule.map((performance, index) => { return { ...performance, index: index.toString() } }),
    }
}

export default connect(mapStateToProps)(PerformanceList);
