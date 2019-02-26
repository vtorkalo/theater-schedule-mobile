import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Left, Header, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default DrawerMenuIcon = (props) => {
    return (
        <Header style={styles.headerContainer} >
            <TouchableOpacity
                onPress={props.onPressMenuIcon}
                style={styles.touchableContainer}
            >
                <Left style={styles.leftContainer} >
                    <Ionicons name='md-arrow-round-back' color='white' size={32} />
                </Left>
            </TouchableOpacity>
            <Body />
            <Right />
        </Header>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#7154b8',
    },
    leftContainer: {
        width: 50,
        backgroundColor: "red",
        justifyContent: "center",
    },
    touchableContainer: {
        justifyContent: "center",
    },

})