import React from 'react';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import { loadWishList } from '../Actions/WishListActions/WishListActionCreators';
import WishList from 'TheaterSchedule/Screens/WishListComponents/WishList'
import LocalizeComponent from "../Localization/LocalizedComponent";

class WishListScreen extends LocalizeComponent {

    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name='wunderlist' size={25} />),
            title: screenProps.WishlistScreenTitle,
        };
    };


    componentDidMount = () => {
        if (this.props.deviceId && this.props.languageCode) {
            this.subs = [
                this.props.navigation.addListener('willFocus', () => { 
                  this.props.loadWishList(AsyncStorage.getItem('UserId'), this.props.languageCode)               
                }),
            ];           
        }
            
    }

    componentWillUnmount() {
        this.subs.forEach((sub) => {
            sub.remove();
        });
    }

    componentDidUpdate = (prevProps) => {
        if ((!prevProps.languageCode && this.props.languageCode) ||
            (prevProps.languageCode !== this.props.languageCode)) {
            this.subs = [
                this.props.navigation.addListener('willFocus', () => { this.props.loadWishList(this.props.deviceId, this.props.languageCode) }),
            ];   
        }        
    }

    render() {

        if (this.props.isLoading || this.props.isLanguageLoading ) {
          if(`${this.props.sendingError}` == null){
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon
                        onPressMenuIcon={() => this.props.navigation.openDrawer()}
                        text={this.t('Favourite')} />
                    <Content contentContainerStyle={styles.contentContainerLoading}>
                        <View style={styles.performancesContainer}>
                            <View style={styles.indicator}>
                                <BallIndicator color="#aaa" />
                            </View>
                            <View style={styles.bottom}>
                                {this.props.chosenPerformances.length != 0 ?
                                    <WishList navigation={this.props.navigation} />
                                    : null
                                }
                            </View>
                        </View>
                    </Content>
                </Container>
            );
                              }
            else{
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon
                        onPressMenuIcon={() => this.props.navigation.openDrawer()}
                        text={this.t('Favourite')} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <View style={styles.performancesContainer}>
                            <WishList navigation={this.props.navigation} />
                        </View>
                    </Content>
                </Container>
            )}
        }
        else {
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon
                        onPressMenuIcon={() => this.props.navigation.openDrawer()}
                        text={this.t('Favourite')} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <View style={styles.performancesContainer}>
                            <WishList navigation={this.props.navigation} />
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
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
    contentContainerLoading: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
    filterContainer: {
        flex: 1,
        justifyContent: 'center',
        borderColor: '#7154b8',
        borderWidth: 2,
        margin: 5,
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    performancesContainer: {
        flex: 12,
    },
    bottom: {
        justifyContent: 'flex-end',
        opacity: 0.3,
    },
    indicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        zIndex: 10,
    }

});

const mapStateToProps = state => {
    return {
        isLoading: state.wishListReducer.loading,
        isLanguageLoading: state.settings.loading,        
        sendingError: state.wishListReducer.error,        
        chosenPerformances: state.wishListReducer.chosenPerformances,
        deviceId: state.settings.deviceId,
        languageCode: state.settings.settings.languageCode,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
      loadWishList: (AccountId, languageCode) => dispatch(loadWishList(AccountId, languageCode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListScreen);