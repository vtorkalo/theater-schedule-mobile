import React, { Component } from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { loadWishList } from 'TheaterSchedule/Actions/WishListActions/WishListActionCreators';

import WishListItem from 'TheaterSchedule/Screens/WishListComponents/WishListItem';

class WishList extends Component {

    componentDidMount() {
        this.props.loadWishList(this.props.deviceId, this.props.languageCode); 
    };

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
        chosenperformances: state.WishListReducer.chosenperformances,
        deviceId: state.settings.deviceId,
        languageCode: state.settings.settings.languageCode,
    }
}
const mapDispatchToProps = {
    loadWishList,
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
