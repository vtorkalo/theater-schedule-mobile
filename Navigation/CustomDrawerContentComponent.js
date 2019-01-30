import React from 'react';
import { DrawerItems } from 'react-navigation';
import { Container, Header, Content } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

const CustomDrawerContent = (props) => (
    <Container>
        <Header style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#7154b8' }}>
            <FontAwesome name='user-circle' style={{ fontSize: 35, color: 'black' }} />
            <MaterialIcons name='notifications-active' style={{ fontSize: 35, color: 'black' }} />
        </Header>
        <Content style={{ backgroundColor: 'white' }}>
            <DrawerItems {...props} activeBackgroundColor='#c3b4e9' itemsContainerStyle={{ opacity: 0.85 }} />
        </Content>
    </Container>
);

export default CustomDrawerContent;


