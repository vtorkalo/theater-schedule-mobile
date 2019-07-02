import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
    Left,
    Right,
    ListItem,
} from "native-base";
import Text from '../Components/CustomText';

class UserProfileItem extends Component {
    render() {
        return (
            <ListItem>
                <Left style={styles.leftContainer}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </Left>
                <Right style={styles.rightContainer}>
                    <Text style={styles.text}>{this.props.value}</Text>
                </Right>
            </ListItem>
        )
    }
}

export default UserProfileItem;

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 20,
    },
    leftContainer: {
        flex: 0.4,
    },
    rightContainer: {
        flex: 0.6,
    },
});