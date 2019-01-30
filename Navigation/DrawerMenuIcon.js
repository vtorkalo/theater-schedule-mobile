import React from 'react';
import { StyleSheet } from 'react-native';
import { Left, Header, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default DrawerMenuIcon = (props) => {
    return (
        <Header style={styles.headerContainer} >
            <Left>
                <Ionicons name='ios-menu' color='white' size={32} onPress={props.onPressMenuIcon} />
            </Left>
            <Body />
            <Right />
        </Header>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#7154b8'
    }
})