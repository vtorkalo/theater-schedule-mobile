import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import  EventItem from './EventItem';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import ListEmpty from '../ScheduleScreenComponents/ListEmpty';

class EventList extends LocalizedComponent {   

    compare = (obj1, obj2) => {
        if (obj1.date < obj2.date)
            return -1;
        if (obj1.date > obj2.date)
            return 1;
        return 0;
    }

    render() {
        return (
            <FlatList
                style={styles.List}
                data={this.props.events.sort(this.compare)}
                keyExtractor={(item) => item.eventId.toString()}  
                ListEmptyComponent={<ListEmpty text={this.t("emptyEventMessage")} />}
                renderItem={({ item }) => (<EventItem event={item}/>)}                              
            />
        );
    }
}

const styles = StyleSheet.create({
    List: {
        width: '100%',
    },
});

const mapStateToProps = state => {
    return {
        events: state.eventReducer.events,
    }
}

export default connect(mapStateToProps)(EventList); 