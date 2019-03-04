import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';



export default class Header extends LocalizedComponent {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{this.t('PromoActionScreenTitle')}</Text>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({ 
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
      },    
      headerText: {
        color: '#7154b8',
        margin: 4,
        paddingBottom: 2,
        fontSize: 25,
        textAlign: 'center',
      },
});