import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Performance from './Performance';

class PerformanceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            perfomances: [
                { title: 'perf1' },
                { title: 'perf2' },
                { title: 'perf3' },
                { title: 'perf4' },
                { title: 'perf5' },
                { title: 'perf6' },
            ],
        };
    }

    render() {
        return (
            <FlatList
                style={styles.performanceList}
                data={this.state.perfomances}
                renderItem={({ item }) => <Performance index={item.index} title={item.title} />}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state.perfomances}
            />
        );
    }
}

const styles = StyleSheet.create({
    performanceList: {
        width: '100%',
    },
});

export default PerformanceList;
