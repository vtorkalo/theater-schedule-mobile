import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { Entypo } from '@expo/vector-icons';
import Header from './PromoActionScreenComponents/Header'
import PromoActionsList from './PromoActionScreenComponents/PromoActionsList'   
import LoadPromoActions from '../Actions/PromoActions'
import { connect } from 'react-redux';


class PromoActionScreen extends Component {   
    static navigationOptions = ({screenProps})=> {
        return {
            drawerIcon: (<Entypo name='new' size={25} />),
            title: screenProps.PromoActionScreenTitle,
        }
    }  

    render() {
        return (
            <Container>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                <View style={styles}>
                    <Header/>
                    <PromoActionsList/>                   
                </View>            
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#b6a2e3',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
      },      
});

const mapStateToProps = state => {
    return {
        isScheduleLoading: state.scheduleReducer.loading,
        isLanguageLoading: state.settings.loading,
        languageCode: state.settings.settings.languageCode,
    }
}

const mapDispatchToProps = {
    LoadPromoActions
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoActionScreen);
