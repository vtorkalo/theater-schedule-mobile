import React, { Component } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

export default class InitialScreen extends Component {
    render() {
        return (
            <View style={styles.contentContainer}>
                <Text>This is initial screen</Text>
                <Button title='Press to go to Schedule Screen' onPress={() => this.props.navigation.navigate("drawerStack")}>
                </Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
