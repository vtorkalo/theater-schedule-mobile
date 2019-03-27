import React from 'react';
import { StyleSheet } from 'react-native';
import { Left, Header, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Text from '../Screens/Components/CustomText'

export default DrawerMenuIcon = (props) => {
    return (
        <Header style={styles.headerContainer} >
            <Left style={styles.leftContainer}>
                <Ionicons name='ios-menu' color='white' size={32} onPress={props.onPressMenuIcon} />
            </Left>
            <Body style={styles.bodyContainer}>
                <Text type="bold" style={styles.text}>{props.text}</Text>
            </Body>
            <Right style={styles.rightContainer} />
        </Header>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#7154b8'
    },
    leftContainer: {
        flex: 1,
    },
    bodyContainer: {
        flex: 6,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
    },
    text: {
        color: '#fff', 
        fontSize: 26, 
        textAlign: 'center',
    },
})