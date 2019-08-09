import React from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import WishListItem from 'TheaterSchedule/Screens/WishListComponents/WishListItem';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import ListEmpty from '../ScheduleScreenComponents/ListEmpty';

class WishList extends LocalizedComponent {  
  
    render() {
      if(`${this.props.sendingError}` === "Error: Unauthorized")
      {
        this.bodyText = `${this.t("To view your favorite list please log in")}`;
      }

      if(`${this.props.sendingError}` === "Error: Some problems!!!")
      {
        this.bodyText = `${this.t("There was a problem during the operation. Please try again or log in")}`;
      }

      if(this.props.sendingError === null)
      {
        this.bodyText = `${this.t("emptyWishlistMessage")}`;
      }
     
      return (
            <FlatList
                style={styles.WishList}
                data={this.props.chosenPerformances}
                keyExtractor={item => item.performanceId.toString()}
                ListEmptyComponent={<ListEmpty text = {this.bodyText}/>}
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
        sendingError: state.wishListReducer.error,   
        chosenPerformances: state.wishListReducer.chosenPerformances,
    }
}

export default connect(mapStateToProps)(WishList);
