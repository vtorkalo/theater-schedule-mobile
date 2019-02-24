import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image  } from 'react-native';
import {setLanguage} from "redux-i18n"; 

export class ErrorScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.errorLogo}><Image  style={styles.errorImage}source={require('../img/errorLogo.png')}></Image></View>
        <View style={styles.errorMessage}><Text style={styles.bigErrorText}>Oooooh no!!</Text>
        <Text style={styles.errorText}>Something went wrong!</Text></View>
        <View style={styles.errorMessage}><Text style={styles.errorText}>ErrorMessage</Text></View>
        <View style={styles.reloadContainer}><TouchableOpacity style={styles.reloadButton} onPress={()=> this.props.navigation.navigate("drawerStack")}><Text style={styles.errorText}>Reload!</Text></TouchableOpacity></View>
      </View>
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