import React, { Component } from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import WishListItem from 'TheaterSchedule/Screens/WishListComponents/WishListItem';

class WishList extends Component {
    render() {
        return (
            <FlatList
                style={styles.WishList}
                data={this.props.chosenPerformances}
                keyExtractor={item => item.performanceId.toString()}
                renderItem={({ item }) => (
                    <WishListItem chosenperformance={item} navigation={this.props.navigation}/>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    WishList: {
        width: '100%',
    },
});

const mapStateToProps = state => {
    return {
        chosenPerformances: state.wishListReducer.chosenPerformances,
    }
}

export default connect(mapStateToProps)(WishList);
