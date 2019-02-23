import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import WishList from 'TheaterSchedule/Screens/WishListComponents/WishList'
import LocalizeComponent from "../Localization/LocalizedComponent";

class WishListScreen extends LocalizeComponent {
    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name='wunderlist' size={25} />),
            title: screenProps.WishlistScreenTitle,
        };
    };

    render() {

        if (this.props.isLoading || this.props.isLanguageLoading) {
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                    <Content contentContainerStyle={styles.contentContainer}>
                        <View style={styles.performancesContainer}>
                            {this.props.chosenperformances.length != 0 ?
                                <WishList navigation={this.props.navigation} /> :
                                null
                            }
                        </View>
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <Container style={styles.container}>
                    <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
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
});

const mapStateToProps = state => {
    return {
        isLoading: state.WishListReducer.loading,
        isLanguageLoading: state.settings.loading,
        chosenperformances: state.WishListReducer.chosenperformances,
    }
}

export default connect(mapStateToProps)(WishListScreen);
