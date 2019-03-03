import React from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import WishListItem from 'TheaterSchedule/Screens/WishListComponents/WishListItem';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import ListEmpty from '../ScheduleScreenComponents/ListEmpty';

class WishList extends LocalizedComponent {
    render() {
        return (
            <FlatList
                style={styles.WishList}
                data={this.props.chosenPerformances}
                keyExtractor={item => item.performanceId.toString()}
                ListEmptyComponent={<ListEmpty text={this.t("emptyWishlistMessage")}/>}
                contentContainerStyle={styles.contentContainer}
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
    contentContainer: {
        flexGrow: 1,
    },
});

const mapStateToProps = state => {
    return {
        chosenPerformances: state.wishListReducer.chosenPerformances,
    }
}

export default connect(mapStateToProps)(WishList);
