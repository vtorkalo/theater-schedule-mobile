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
                    <WatchListItem chosenperformance={item} />
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
        chosenperformances: state.watchListReducer.chosenperformances,
    }
}

export default connect(mapStateToProps)(WatchList);
