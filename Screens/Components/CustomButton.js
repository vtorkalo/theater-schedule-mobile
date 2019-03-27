import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../Components/CustomText';

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
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props.onPress} disabled={props.disabled}>
                <Text style={props.textStyle}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
}
