import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

export default UniformButton = (props) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#7154b8',
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
        }

    });

    return (
        <Button rounded style={[styles.button, { ...props.style }]} onPress={props.onPress} >
            <Text uppercase={false} style={[styles.buttonText, { ...props.buttonText }]}>{props.text}</Text>
        </Button>
    );
}
