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
            backgroundColor: props.style.backgroundColor,
            borderRadius: 10,
            marginRight: 20  
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Text style={props.textStyle}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
