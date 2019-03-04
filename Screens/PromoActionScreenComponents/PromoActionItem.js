import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent'

class PromoActionItem extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    pressedDetailsHandler = () => {
        alert(this.props.promoAction.description)
    }

    render() {
        return (
            <View style={styles.taskContainer}>               
                <TouchableOpacity> 
                    <Text>{this.props.promoAction.description}</Text>
                </TouchableOpacity>                               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    taskContainer: {        
        flex: 3,
        flexDirection: 'row',
        minHeight: 200,
        marginVertical: 10,        
        backgroundColor: '#eee',
        height: '80%',
        width: '100%',              
        borderBottomColor: '#ddd', borderBottomWidth: 1,        
    },
});

export default connect()(PromoActionItem);