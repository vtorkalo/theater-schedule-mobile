import React , { Component } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image  } from 'react-native';
import LocalizeComponent from "../Localization/LocalizedComponent";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container } from 'native-base';
export class ErrorScreen extends LocalizeComponent {
  swichscreen=()=>
  {
    this.props.navigation.navigate("Schedule");
    throw("hello");
  }
    static navigationOptions = ({screenProps})=> {
        return {
            drawerIcon: (<MaterialCommunityIcons name='alien' size={25} />),
            title: screenProps.ErrorScreenTitle,
        }
    }  
    render() {
    return (
        <Container>
            <DrawerMenuIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
            <View style={styles.container}>
                <View style={styles.errorLogo}><Image  style={styles.errorImage}source={require('../img/errorLogo.png')}></Image></View>
                <View style={styles.errorMessage}><Text style={styles.bigErrorText}>{this.t('ErrorTextHeader')}</Text>
                <Text style={styles.errorText}>{this.t('ErrorTextBody')}</Text></View>
                <View style={styles.errorMessage}><Text style={styles.errorText}>{this.t('ErrorMessage')}</Text></View>
                <View style={styles.reloadContainer}><TouchableOpacity style={styles.reloadButton} onPress={()=>this.swichscreen() }><Text style={styles.errorText}>{this.t('Reload')}</Text></TouchableOpacity></View>
            </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b6a2e3',
    justifyContent: 'center',
  },
  errorLogo:{
    flex:3,
    paddingTop:30,

    alignItems:"center",
  },
  errorMessage:{
    flex:1,
    justifyContent: 'center',
    alignItems:"center",
  },
  reloadContainer:{
    flex:3,
    alignItems:"center",
    justifyContent:"center",
  },
  reloadButton:{
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    color:"white",
    width:"60%",
    height:"30%",
    backgroundColor:"#7e56d8",
  },
  errorText:{
    color:"#e8deff",
    alignItems:"center",
    fontSize:20
  },
  bigErrorText:{
    color:"#e8deff",
  alignItems:"center",
    fontSize:30,
  }
});