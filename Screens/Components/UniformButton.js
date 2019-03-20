import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';


export default UniformButton = (props) => {
    const styles = StyleSheet.create({
        button: {    
            backgroundColor: '#7154b8',
            ...props.style
        },

    });
    return (
            <Button rounded style={styles.button} onPress={props.onPress} >
                <Text style={props.textStyle}>{props.text}</Text>
            </Button>

    );
}
