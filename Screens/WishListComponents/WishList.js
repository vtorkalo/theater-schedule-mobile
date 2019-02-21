import React, { Component } from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import WishListItem from 'TheaterSchedule/Screens/WishListComponents/WishListItem';

class WishList extends Component {
    render() {
        return (
            <FlatList
                style={styles.WishList}
                data={this.props.chosenperformances}
                keyExtractor={item => item.performanceId.toString()}
                renderItem={({ item }) => (
                    <WishListItem chosenperformance={item} navigation={this.props.navigation} isChecked={item.isChecked}/>
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
        chosenperformances: state.WishListReducer.chosenperformances.map((chosenperformance, index) => { return { ...chosenperformance, index: index.toString() } }),
    }
}

export default connect(mapStateToProps)(WishList);
