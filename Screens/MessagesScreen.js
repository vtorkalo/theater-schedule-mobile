import LocalizeComponent from "../Localization/LocalizedComponent";
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native';
import DrawerMenuIcon from 'TheaterSchedule/Navigation/DrawerMenuIcon';
import { Container, Content, Button } from 'native-base';
import BASE_URL from 'TheaterSchedule/BaseURLDubbing'

class MessagesScreen extends LocalizeComponent
{
    static navigationOptions = ({ screenProps }) => {
        return {
            drawerIcon: (<MaterialCommunityIcons name="message" size={25} />),
            title: screenProps.MessagesScreenTitle,
        };
    };
    componentDidMount() {
       // this.props.fetchAllMessages(BASE_URL + 'api/performance')
    }
    render(){
        return(
            <Container>
                <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../img/StreamImg/img_3.png')}></ImageBackground>
                <DrawerMenuIcon
                        onPressMenuIcon={() => this.props.navigation.openDrawer()}
                        text={this.t('Messages')} />
            </Container>
        );
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        //fetchAllMessages: (url) => dispatch(getData(url)),
        //fetchPrivateMessages:(url)=>dispatch(getData(url))
    };
}
export default connect(mapDispatchToProps)(MessagesScreen)