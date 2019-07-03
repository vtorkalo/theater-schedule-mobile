import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Left, Header, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Text from '../Screens/Components/CustomText';
import LocalizeComponent from "../Localization/LocalizedComponent";

class ReturnMenuIcon extends LocalizeComponent {
    render() {
        return (
            <Header style={styles.headerContainer} >
                <TouchableOpacity
                    onPress={this.props.onPressMenuIcon}
                    style={styles.touchableContainer}
                >
                    <Left style={styles.leftContainer} >
                        <Ionicons name='md-arrow-round-back' color='white' size={32} />
                    </Left>
                </TouchableOpacity>
                {
                    this.props.showBody
                        ?
                        <Body style={styles.bodyContainer}>
                            <Text type="bold" style={styles.text}>{this.t(this.props.text)}</Text>
                        </Body>
                        :
                        <Body style={styles.bodyContainer} />
                }
                <Right style={styles.rightContainer} />
            </Header>
        )
    }
}

export default ReturnMenuIcon;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#7154b8',
        borderColor: '#7154b8',
        borderBottomWidth: 0,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0
    },
    leftContainer: {
        width: 50,
        justifyContent: "center",
        flex: 1,
    },
    rightContainer: {
        width: 50,
        flex: 1,
    },
    touchableContainer: {
        justifyContent: "center",
    },
    bodyContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: "center",
    },
    text: {
        color: '#fff',
        fontSize: 26,
        textAlign: 'center',
    },
})