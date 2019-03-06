import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { Entypo } from '@expo/vector-icons';
import Header from './PromoActionScreenComponents/Header'
import PromoActionsList from './PromoActionScreenComponents/PromoActionsList'   
import { LoadPromoActions } from '../Actions/PromoActions'
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';

class PromoActionScreen extends Component {   
    static navigationOptions = ({screenProps})=> {
        return {
            drawerIcon: (<Entypo name='new' size={25} />),
            title: screenProps.PromoActionScreenTitle,
        }
    }  

    componentDidMount() {
        if (this.props.languageCode) {       
            this.props.LoadPromoActions(this.props.languageCode);
        }
    }

    componentDidUpdate(prevProps) {
        if ((!prevProps.languageCode && this.props.languageCode) ||
            (prevProps.languageCode !== this.props.languageCode)) {
            this.props.LoadPromoActions(this.props.languageCode);
        }
    }

    render() {
        if (this.props.isPromoActionLoading || this.props.isLanguageLoading) {
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <BallIndicator color="#aaa" />
                    </Content>
                </Container>
            );
        }
        else {
        return (
            <Container>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                <View>
                    <Header/>
                    <PromoActionsList/>                   
                </View>            
                </Content>
            </Container>
        )
        }
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
        justifyContent: 'flex-start',
        backgroundColor: '#BFD0D670',
    },   
});

const mapStateToProps = state => {
    return {      
        languageCode: state.settings.settings.languageCode,
        promoActions: state.promoActionReducer.promoActions,       
        isPromoActionLoading: state.promoActionReducer.loading,
        isLanguageLoading: state.settings.loading,
    }
}

const mapDispatchToProps = {
    LoadPromoActions
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoActionScreen);
