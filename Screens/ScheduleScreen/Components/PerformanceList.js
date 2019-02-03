import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import PerformanceItem from './PerformanceItem';

export default PerformanceList = props => {
    return (
        <FlatList
            style={styles.performanceList}
            data={props.performances}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <PerformanceItem
                    performance={item}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    performanceList: {
        width: '100%',
    },
});
