import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import PerformanceStreamItem from './PerformanceStreamItem';

class PerformanceList extends LocalizedComponent {

    render() {

        return (
            <FlatList
                style={styles.container}
                data={this.props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <PerformanceStreamItem navigation={this.props.navigation} performance={item} />
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',    }
});

const mapStateToProps = (state) => {
    return {
        data: state.streamReducer.performances
    }
}


export default connect(mapStateToProps)(PerformanceList);
