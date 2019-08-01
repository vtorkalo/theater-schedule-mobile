import LocalizeComponent from "../Localization/LocalizedComponent";
import React from 'react';
import {Toast} from 'native-base';
import {ImageBackground} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { StyleSheet, View, Text,AsyncStorage,FlatList } from 'react-native';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { Container, Button } from 'native-base';
import { BallIndicator } from 'react-native-indicators';
import BASE_URL from 'TheaterSchedule/baseURL';

class MessagesScreen extends LocalizeComponent
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            privateMessages:[{}],
            publicMessages:[{}],
            currentPublic:true,
            isLoaded:false
        }
    }
    static navigationOptions = ({ screenProps }) => {
        return {
            drawerLabel: () => null,
            title: screenProps.MessagesScreenTitle,
        };
    };
    async fetchMessages(isPublic)
    {
        this.setState({isLoaded:false});
        if (!isPublic)
        {
            
            fetch(`${BASE_URL}AdminsPost`).then(response=>{
                console.log(`${BASE_URL}AdminsPost`)
                return response.json();
            }).then((msgs)=>{
                console.log(msgs);
                this.setState({publicMessages:msgs, isLoaded:true,currentPublic:true});
            })
        }
        else
        {  
           let Accountid= await AsyncStorage.getItem('UserId');
           //should be uncommented when userid will correctly store after authorization
           console.log(`${BASE_URL}AdminsPost/${Accountid}`);           
            var accessToken = await AsyncStorage.getItem('AccessToken'); 
            fetch(`${BASE_URL}AdminsPost/${Accountid}`,{
              method: "GET",
              headers: {
              'Authorization': 'Bearer ' + accessToken,
              "Accept": "application/json",
              "Content-Type": "application/json"
            }}).then( async (response) =>{
              if (!response.ok) {
                throw new Error("Some problems!!!");
            }     
            const headersAccessToken = response.headers.get('newaccess_token');

            if(headersAccessToken != null)
            {
              await AsyncStorage.setItem('AccessToken', headersAccessToken); 
            }     
              return response.json();
            }).then((msgs)=>{
                console.log(msgs);
                this.setState({privateMessages:msgs, isLoaded:true,currentPublic:false});
            }).catch(error => {
              Toast.show({
                text: this.t("Please log in"),
                buttonText: "Okay",
                type: "warning",
                duration: 3000
              })
            });
        };
    }
    componentDidMount() {
      
       this.fetchMessages();
    }
    pickedPublic()
    {
       
        if(this.state.currentPublic){
            
            
            this.fetchMessages(true);
        }
    }
    pickedPrivate()
    {
      
        if(!this.state.currentPublic){
          
            
            this.fetchMessages(false);
        } 
    }
    changeTypeOfMessages=
    {
    
        public:{
            text:'public messages',
            click:()=>{
                console.log(this.state.currentPublic)
                if(!this.state.currentPublic){
                    
                    this.fetchMessages(false);
                } 
            }
        },
        private:{
            text:'private messages',
            click:()=>
            {
                console.log(this.state.currentPublic)
                if(this.state.currentPublic){
                    console.log("picckedd");
            
                    this.fetchMessages(true);
        } 
            }
        }
        
    }
    render(){
        if(!this.state.isLoaded){
            return(
                <Container style={{ flex: 1,backgroundColor:'#BFD0D670' }}>
                   <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}>
                    <DrawerMenuIcon
                            onPressMenuIcon={() => this.props.navigation.openDrawer()}
                            text={"Messages"}
                            showMessageTypeIcon={true}
                            items={this.changeTypeOfMessages}
                            />
                            
                                <View style={styles.container}>
                                    <BallIndicator color="#aaa" />
                                </View>
                                </ImageBackground>
                    </Container>
                    )
        }
        else{
            
        return(
            <Container style={{ flex: 1,backgroundColor:'#BFD0D670' }}>
               <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}>
                <DrawerMenuIcon
                        onPressMenuIcon={() => this.props.navigation.openDrawer()}
                        text={"Messages"}
                        showMessageTypeIcon={true}
                        items={this.changeTypeOfMessages}
                        />
                        
                            <View style={styles.container}>
                                <FlatList
                                data={this.state.currentPublic?this.state.publicMessages:this.state.privateMessages}
                                renderItem={({item})=>
                                <View style={styles.title}>
                                    <Text style={{fontSize:20,fontStyle:'italic',color:'white'}}>{item.subject}</Text>
                                    <View style={styles.message}>
                                    <Text style={{marginLeft:5, fontSize:15,fontStyle:'italic'}}>{item.postText}</Text>
                                </View>
                                </View>
                                }
                                />
                            </View>
                        </ImageBackground>
            </Container>
        );
    }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        
    },
    title:
    {
        alignSelf:'center',
        marginTop:10,
        width:'99%',
        borderRadius:5,
        backgroundColor: '#7154b8',
        alignItems:'center'
    },
    message:
    {
        alignSelf:'center',
        marginTop:10,
        width:'100%',
        borderBottomEndRadius:5,
        borderBottomStartRadius:5,
        backgroundColor: '#5E459B',
        alignItems:'flex-start'
    }
    
})
const mapDispatchToProps = (dispatch) => {
    return {
        //fetchAllMessages: (url) => dispatch(getData(url)),
        //fetchPrivateMessages:(url)=>dispatch(getData(url))
    };
}
export default connect(mapDispatchToProps)(MessagesScreen)