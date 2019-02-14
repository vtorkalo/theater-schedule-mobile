import React, { Component } from 'react';
import { FlatList, StyleSheet} from 'react-native';
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
                    <PerformanceItem performance={item} index={item.scheduleId} isChosen={item.isChecked}/>
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
        performances: state.scheduleReducer.performances.map((performance, index) => { return { ...performance, index: performance.scheduleId.toString() } }),
    }
}

export default connect(mapStateToProps)(PerformanceList);
