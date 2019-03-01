import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LocalizedComponent from "TheaterSchedule/Localization/LocalizedComponent";

import PerformanceItem from 'TheaterSchedule/Screens/ScheduleScreenComponents/PerformanceItem';

class PerformanceList extends LocalizedComponent {
    ListEmpty = () => {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.text}>{this.t("emptyScreenMessage")}</Text>
            </View>
        );
    };

    render() {
        return (
            <FlatList
                style={styles.performanceList}
                data={this.props.schedule}
                keyExtractor={item => item.scheduleId.toString()}
                ListEmptyComponent={this.ListEmpty}
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
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center', 
        fontSize: 25, 
        color: '#7154b8',
    },
});

const mapStateToProps = state => {
    return {
        schedule: state.scheduleReducer.schedule,
    }
}

export default connect(mapStateToProps)(PerformanceList);
