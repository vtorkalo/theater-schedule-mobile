import React, { Component } from 'react';
import {View, StyleSheet, FlatList, Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import moment from 'moment';
import Text from '../Components/CustomText';

export default class ScheduleItem extends Component{

    iterateScheduleList(list){
        for(let index=0; index<list.length;index++)
        {
            <Text>{list.time}</Text>
        }
    }

    convertDateToReadableDate = date => {
        return moment(date).format("D MMMM");
    }

    convertToReadableTime = time => {
        return moment(time).format("HH:mm");
    }

    render(){
        const {data: {day, timeLinkList}} = this.props;
        return(
            <View>
                <View style={styles.dateContainer}>
                    <Feather name='calendar' color='#5b3fa8' size={23} style={{paddingRight:7, paddingLeft:5}}/>
                    <Text style={styles.date}>{this.convertDateToReadableDate(day)}</Text>
                </View>
                
                <View style={styles.timeContainer}>
                    <FlatList
                    horizontal
                    data={timeLinkList}
                    keyExtractor={(item)=>item.link.toString()}
                    renderItem={({item})=><Text style={styles.time} onPress={()=>Linking.openURL(item.link)}>{this.convertToReadableTime(item.time)}</Text>}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dateContainer:{
        flexDirection:'row',
        borderRadius: 10,
        marginBottom: 6,
        backgroundColor: '#E0E0E0',
        padding: 7,
        marginTop:3,
        marginHorizontal:14,
    },
    date: {
        fontSize: 19, 
        color: '#1a1917', 
        fontWeight: '400'
    },
    timeContainer: {
        padding: 14,
        marginHorizontal:14,
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        marginBottom:7,
    },
    time: {
        fontSize: 20, 
        color: '#5b3fa8', 
        fontWeight: '500',
        textDecorationLine:'underline',
        paddingHorizontal:10,
    },
});