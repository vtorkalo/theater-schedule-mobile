import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { Entypo } from '@expo/vector-icons';
import Header from './ExcursionScreenComponents/Header';
import ExcursionsList from './ExcursionScreenComponents/ExcursionsList';
import { loadExcursions } from '../Actions/excursionActions';
import { connect } from 'react-redux';


class ExcursionScreen extends Component {   
    static navigationOptions = ({screenProps})=> {
        return {
            drawerIcon: (<Entypo name='camera' size={25} />),
            title: screenProps.ExcursionScreenTitle,
        }
    }  

    componentDidMount() {
        if (this.props.languageCode) {
            this.props.loadExcursions(this.props.languageCode);
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.languageCode && this.props.languageCode) ||
            (prevProps.languageCode !== this.props.languageCode)) {
            this.props.loadExcursions(this.props.languageCode);
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Header/>
                </View>
                <View style={styles.excursionsContainer}>
                    <ExcursionsList/>
                </View>            
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#BFD0D670'
    },
    excursionsContainer: {
        flex: 12,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: '#7154b8',
        borderWidth: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 0,
        borderRadius: 30,
        backgroundColor: '#fff',
    },      
});

const mapStateToProps = state => {
    return {
        languageCode: state.settings.settings.languageCode,
    }
}

const mapDispatchToProps = {
    loadExcursions
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcursionScreen);
