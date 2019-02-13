import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loadPerformance } from 'TheaterSchedule/Actions/PerformanceCreator';



class PerformanceMainScreen extends Component {



    render() {
        // console.log(this.props.navigation.state);
        // const photo = this.props.navigation.getParam('photo', 'NO-PHOTO');
        
        let base64Image =`data:image/png;base64,${this.props.photo}`;
        return (
            <View style={{flex:1}}>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',


    },
    contentContainer1: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
});

const mapStateToProps = state => {
    return {

        performance: state.performanceReducer.performance,
        error: state.performanceReducer.error,

    }
}



export default connect(mapStateToProps)(PerformanceMainScreen);

