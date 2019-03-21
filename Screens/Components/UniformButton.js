import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

export default UniformButton = (props) => {
    const styles = StyleSheet.create({
        button: {    
            backgroundColor: '#7154b8',
            ...props.style
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
        }

    });

    return (
            <Button rounded style={styles.button} onPress={props.onPress} >
                <Text uppercase={false} style={styles.buttonText}>{props.text}</Text>
            </Button>

    );
}
