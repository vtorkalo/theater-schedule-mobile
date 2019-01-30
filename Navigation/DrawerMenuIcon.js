import React from 'react';
import { Left, Header, Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default DrawerMenuIcon = (props) => {
    return (
        <Header style={{ backgroundColor: '#7154b8' }}>
            <Left>
                <Ionicons name='ios-menu' color='white' size={32} onPress={props.onPressMenuIcon} style={{ marginTop: 11 }} />
            </Left>
            <Right />
        </Header>
    )
}
