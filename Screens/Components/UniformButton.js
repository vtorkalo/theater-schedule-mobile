import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';


export default UniformButton = (props) => {
    const styles = StyleSheet.create({
<<<<<<< HEAD
        button: {
            backgroundColor: '#7154b8',
=======
        button: {    
            backgroundColor: '#7154b8',
            ...props.style
>>>>>>> 13186921805912b3424e8ca95e54f6c6af004800
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
        }

    });
    return (
<<<<<<< HEAD
        <Button rounded style={[styles.button, { ...props.style }]} onPress={props.onPress} >
            <Text uppercase={false} style={[styles.buttonText, { ...props.buttonText }]}>{props.text}</Text>
        </Button>
=======
            <Button rounded style={styles.button} onPress={props.onPress} >
                <Text uppercase={false} style={styles.buttonText}>{props.text}</Text>
            </Button>
>>>>>>> 13186921805912b3424e8ca95e54f6c6af004800

    );
}
