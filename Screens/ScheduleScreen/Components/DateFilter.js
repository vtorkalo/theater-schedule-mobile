import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import DateRangePicker from './DateRangePicker'

class DateFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilterVisible: false,
        }
    }

    onPressMenuIcon = () => {
        this.setState({
            isFilterVisible: true,
        });
    }

    cancelFilter = () => {
        this.setState({
            isFilterVisible: false,
        });
    }

    confirmFilter = () => {
        this.setState({
            isFilterVisible: false,
        });

        
    }

    render() {
        return (
            <View style={styles.filterContainer} >
                <DateRangePicker isVisible={this.state.isFilterVisible} onCancel={this.cancelFilter} onConfirm={this.confirmFilter} />
                <Text style={styles.text}>Current dates: {this.props.startDate} - {this.props.startDate}</Text>
                <View style={styles.icon}>
                    <Ionicons name='ios-options' color='#7154b8' size={32} onPress={this.onPressMenuIcon} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        color: '#7154b8',
        fontSize: 17,
    },
    icon: {
        borderLeftColor: '#ccc',
        borderLeftWidth: 2,
        paddingLeft: 5,
        margin: 2,
    },
});

export default DateFilter;
