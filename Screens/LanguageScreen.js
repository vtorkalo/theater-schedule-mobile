
import React, {Component} from 'react';
import { StyleSheet, Text,Image, View,TouchableOpacity} from 'react-native';
import {storeSettings}from '../Actions/settingsActions';
import DeviceInfo from "react-native-device-info";
import { connect } from 'react-redux';
import {setLanguage} from 'redux-i18n';

let deviceId =
            Expo.Constants.appOwnership == "expo"
                ? Expo.Constants.deviceId
                : DeviceInfo.getUniqueID();
export default class App extends Component {
    
  render() {
    SetLang=(code)=>{
         this.props.storeSettings(deviceId,{languageCode: code});
        //this.props.navigation.navigate("ScheduleScreen");
         this.props.setLanguage(code);
    }
    return (
      <View style={styles.container}>
       <View style={styles.imageBox}>
       <Image
          source={require('./images/images.png')}
        />
       </View>
       <View style={styles.buttonBox}>
       <TouchableOpacity onPress={()=>SetLang("en")} style={styles.myButton}>
          <Text style={{color:"white"}}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>SetLang("ua")} style={styles.myButton}>
          <Text style={{color:"white"}}>Українська</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>SetLang("ru")} style={styles.myButton}>
          <Text style={{color:"white"}}>Русский</Text>
        </TouchableOpacity>
       </View>
      </View>
    );
  }
}
//func ()
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  imageBox:{
    flex: 3,
    justifyContent:"center",
    alignItems: "center",
    margin:50
  },
  buttonBox:{
    margin:10,
    flex:2,
    justifyContent:"center",
    alignItems:"center",
    
  },
  myButton:{
    width: "70%",
    color:"white",
    backgroundColor:"purple",
    alignItems:"center",
    margin:1,
    justifyContent:"center",
    flex:1/3,
    borderRadius:4,
  },
 

});
const mapStateToProps = (state) => {
    return {
        settings: state.settings
    };
}

const mapDispatchToProps = {
    storeSettings
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);

