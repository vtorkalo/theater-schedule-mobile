import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
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
            <View style={styles.promoActionContainer}>               
                <TouchableOpacity onPress={this.pressedDetailsHandler}> 
                    <Text style={styles.title}>{this.props.promoAction.promoActionName}</Text>
                    <Text>{this.props.promoAction.description}</Text>
                </TouchableOpacity>                               
            </View>
        );
    }
}

const QUARTER_OF_WINDOW_HEIGHT = Dimensions.get('window').height * 0.25;

const styles = StyleSheet.create({
    promoActionContainer: {
        height: QUARTER_OF_WINDOW_HEIGHT,
        backgroundColor: '#fff',
        borderColor: '#7154b8',
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
    },
    title: {
        color: '#7154b8',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 2,
        margin: 4,
        borderBottomWidth: 2,
        borderBottomColor: '#7154b8',
    },
});

export default connect()(PromoActionItem);