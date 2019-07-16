import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { DrawerItems, DrawerItem } from 'react-navigation';
import { Container, Header, Content } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

const CustomDrawerContent = (props) => (
    <Container>
        <Header style={styles.headerContainer}>
            <TouchableOpacity onPress={ async () => {
                await AsyncStorage.getItem("RefreshToken")
                .then((token) => { 
                    if (token === null) {
                        props.navigation.navigate('Authorization');
                        props.navigation.closeDrawer();
                    }
                    else {
                        props.navigation.navigate('UserProfile');
                        props.navigation.closeDrawer(); 
                    }
                })                  
            }}>
                <FontAwesome name='user-circle' style={styles.iconscontainer} />
            </TouchableOpacity>
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
