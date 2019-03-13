import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default CustomButton = (props) => {
    const styles = StyleSheet.create({
        container: {
            width: props.style.width || '100%',
            height: props.style.height || '100%',
        },
        button: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9c20c',
            borderRadius: props.style.borderRadius || 0,
        },
        text: {
            color: '#000', 
            textAlign: 'center', 
            fontSize: props.style.fontSize || 15,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}
