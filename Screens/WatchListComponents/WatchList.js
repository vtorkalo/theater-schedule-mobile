import React, { Component } from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import WatchListItem from 'TheaterSchedule/Screens/WatchListComponents/WatchListItem';

class WatchList extends Component {
    render() {
        return (
            <FlatList
                style={styles.watchList}
                data={this.props.chosenperformances}
                keyExtractor={item => item.scheduleId.toString()}
                renderItem={({ item }) => (
                    <WatchListItem chosenperformance={item} index={item.scheduleId} isChosen={item.isChecked}/>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    watchList: {
        width: '100%',
    },
});

const mapStateToProps = state => {
    return {
        chosenperformances: state.watchListReducer.chosenperformances.map((performance, index) => { return { ...performance, index: performance.scheduleId.toString() } }),
    }
}

export default connect(mapStateToProps)(WatchList);
