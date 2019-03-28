import React from 'react';
import LocalizedComponent from '../../Localization/LocalizedComponent';
import {View,StyleSheet,Linking} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Text from '../Components/CustomText';

export default class Contacts extends LocalizedComponent{
    render() {
        return(
            <View>
                <View style={styles.textContainer}>
                    <Text style={{fontSize:20}}>{this.t("Address:")}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.t("TheaterAddress")}</Text>                 
                </View>
                <View style={styles.textContainer}>
                    <Text style={{fontSize:20}}>{this.t("Waiting room:")}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>+38 (032) 235-47-73</Text>                 
                </View>
                <View style={styles.textContainer}>
                    <Text style={{fontSize:20}}>{this.t("Pay office:")}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>+38 (032) 235-58-32</Text>                 
                </View>
                <View style={styles.textContainer}>
                    <Text style={{fontSize:20}}>E-mail:</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>info@lvivpuppet.com</Text>                 
                </View>
                <View style={styles.linkContainer}>
                    <FontAwesome name='facebook-square' size={25} style={{paddingRight:7}}/>
                    <Text style={styles.link} onPress={()=>Linking.openURL('https://www.facebook.com/LvivPuppetTheater')}>Facebook</Text>                 
                </View>
                <View style={styles.linkContainer}>
                    <FontAwesome name='instagram' size={25} style={{ paddingRight: 7 }} />
                    <Text style={styles.link} onPress={() => Linking.openURL('https://www.instagram.com/lvivpuppettheater/')}>Instagram</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        marginHorizontal:20,
        marginVertical:5,
    },
    text:{
        fontSize:16, fontWeight:'600'
    },
    linkContainer:{
        marginHorizontal:20,
        marginVertical:5,
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    link:{
        fontSize:18, 
        fontWeight:'600',
        textDecorationLine:'underline',
    }
})
