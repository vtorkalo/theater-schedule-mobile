import React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { Container, Header, Content } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

const CustomDrawerContent = (props) => (
    <Container>
        <Header style={styles.headerContainer}>
            <FontAwesome name='user-circle' style={styles.iconscontainer} />
            <MaterialIcons name='notifications-active' style={styles.iconscontainer} />
        </Header>
        <Content style={{ backgroundColor: 'white' }}>
            <DrawerItems {...props} activeBackgroundColor='#c3b4e9' itemsContainerStyle={{ opacity: 0.85 }} />
        </Content>
    </Container>
);

export default CustomDrawerContent;

const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#7154b8'
    },
    iconscontainer: {
        fontSize: 35,
        color: 'black'
    }

})

