import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import PerformanceItem from 'TheaterSchedule/Screens/ScheduleScreenComponents/PerformanceItem';
import ListEmpty from './ListEmpty';

class PerformanceList extends LocalizedComponent {
    render() {
        return (
            <FlatList
                style={styles.performanceList}
                data={this.props.schedule}
                keyExtractor={(item, index) => 'key'+ index}
                ListEmptyComponent={<ListEmpty text={this.t("emptyScheduleMessage")} />}
                contentContainerStyle={styles.contentContainer}
                renderItem={({ item }) => (
                    <PerformanceItem performance={item} navigation={this.props.navigation} />
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    performanceList: {
        flex: 1,
        width: '100%',
    },
    contentContainer: {
        flexGrow: 1,
    },
});

const mapStateToProps = state => {
    return {
        schedule: state.scheduleReducer.schedule,
    }
}

export default connect(mapStateToProps)(PerformanceList);
