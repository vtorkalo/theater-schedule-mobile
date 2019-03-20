import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';


export default UniformButton = (props) => {
    const styles = StyleSheet.create({
        button: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            ...props.style
        },
        container: {
            width: props.style.width || '100%',
            height: props.style.height || '100%',
        }

    });

    return (
        <Container style={styles.container}>
            <Button rounded style={styles.button} onPress={props.onPress} >
                <Text style={props.textStyle}>{props.text}</Text>
            </Button>
        </Container>

    );
}
