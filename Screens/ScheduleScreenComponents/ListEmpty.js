import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default ListEmpty = (props) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
