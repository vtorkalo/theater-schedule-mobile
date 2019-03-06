import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { Container, Content, Header, Body } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { Segment, Button } from 'native-base';
import TheaterHistory from './AboutTheaterScreenComponents/TheaterHistory';
import Contacts from './AboutTheaterScreenComponents/Contacts';
import LocalizedComponent from '../Localization/LocalizedComponent';


export default class AboutTheaterScreen extends LocalizedComponent {
    constructor(props) {
        super(props);
        this.state = { activePage: 1 }
    }

    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name='information' size={25} />),
            title: screenProps.AboutTheater,
        }
    }

    selectPage = (activePage) => () => this.setState({ activePage });

    _renderPage = () => {
        switch (this.state.activePage) {
            case 1: {
                return <TheaterHistory />;
            }
            case 2: {
                return <Contacts />;
            }
        }
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: 'https://lvivpuppet.com/wp-content/themes/puppets/img/theatre-hero.png' }} />
                </View>
                <View><Text style={styles.title}>{this.t("AboutTheater")}</Text></View>
                <Segment style={{backgroundColor:'white'}}>
                    <Button first active onPress={this.selectPage(1)} style={styles.button}><Text style={styles.text}>{this.t("Theater history")}</Text></Button>
                    <Button onPress={this.selectPage(2)} style={styles.button}><Text style={styles.text}>{this.t("Contacts")}</Text></Button>
                </Segment>
                <Content padder>{this._renderPage()}</Content>
            </Container>
        );
    }


}

const { height: viewportHeight } = Dimensions.get('window');
const imageHeight = viewportHeight*0.21;
const styles = StyleSheet.create({
    imageContainer: {
        height: imageHeight,
        width: null
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    title: {
        color: '#5b3fa8',
        fontSize: 32,
        textAlign: 'left',
        marginLeft: 7,
        marginVertical: 10,
        fontWeight: '600',
        letterSpacing: 0.25,
    },
    button: {
        width: 155,
        height: 35,
        backgroundColor: '#c3b4e9',
        borderColor: '#5b3fa8',
        borderRadius: 2,
    },
    text: {
        flex: 1,
        textAlign: 'center'
    }
})
