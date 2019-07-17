import LocalizeComponent from "../Localization/LocalizedComponent";
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { StyleSheet, View, Text,AsyncStorage,FlatList } from 'react-native';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { Container, Button } from 'native-base';
import { BallIndicator } from 'react-native-indicators';
import BASE_URL from 'TheaterSchedule/BaseURLDubbing'

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
            drawerIcon: (<MaterialCommunityIcons name="message" size={25} />),
            title: screenProps.MessagesScreenTitle,
        };
    };
    async fetchMessages()
    {
        if (this.state.currentPublic)
        {
            let messages;
            fetch(`${BASE_URL}AdminsPost`).then(response=>{
                return response.json();
                //console.log(response);
               // console.log(messages);
            }).then((msgs)=>{
                console.log(msgs);
                this.setState({publicMessages:msgs, isLoaded:true});
            })
        }

    }
    componentDidMount() {
       //this.props.fetchAllMessages(BASE_URL + 'api/performance')
       this.fetchMessages();
    }
    render(){
        if(!this.state.isLoaded){
            return(
                <Container style={{ flex: 1,backgroundColor:'#BFD0D670' }}>
                   
                    <DrawerMenuIcon
                            onPressMenuIcon={() => this.props.navigation.openDrawer()}
                            text={"Messages"} />
                            
                                <View style={styles.container}>
                                    <BallIndicator color="#aaa" />
                                </View>
                    </Container>
                    )
        }
        else{
        return(
            <Container style={{ flex: 1,backgroundColor:'#BFD0D670' }}>
               
                <DrawerMenuIcon
                        onPressMenuIcon={() => this.props.navigation.openDrawer()}
                        text={"Messages"} />
                        
                            <View style={styles.container}>
                                <FlatList
                                data={this.state.publicMessages}
                                renderItem={({item})=>
                                <View style={styles.title}>
                                    <Text style={{fontSize:20,fontStyle:'italic',color:'white'}}>{item.subject}</Text>
                                    <View style={styles.message}>
                                    <Text style={{fontSize:15,fontStyle:'italic'}}>{item.postText}</Text>
                                </View>
                                </View>
                                }
                                />
                            </View>
                        
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
        borderRadius:15,
        backgroundColor: '#7154b8',
        alignItems:'center'
    },
    message:
    {
        alignSelf:'center',
        marginTop:10,
        width:'100%',
        borderBottomEndRadius:15,
        borderBottomStartRadius:15,
        backgroundColor: '#5E459B',
        alignItems:'center'
    }
    
})
const mapDispatchToProps = (dispatch) => {
    return {
        //fetchAllMessages: (url) => dispatch(getData(url)),
        //fetchPrivateMessages:(url)=>dispatch(getData(url))
    };
}
export default connect(mapDispatchToProps)(MessagesScreen)