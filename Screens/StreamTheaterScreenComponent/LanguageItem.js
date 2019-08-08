import React from 'react';
import {View,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent'
import UniformButton from "../Components/UniformButton"
import { toggleLang} from "TheaterSchedule/Actions/StreamActions/StreamActionCreator"

class LanguageItem extends LocalizedComponent {
    constructor() {
        super();
    }

    pressedLanguageHandler = () => {
        this.props.navigation.navigate("streamConnectingScreen");
    }

    CombineFunction(id) {
        
        this.props.toggleLangId(id);
        this.pressedLanguageHandler();
    }

    render() {
        return (          
            <View style={styles.container}>
                <UniformButton style={{ flex: 1,flexDirection: 'row', justifyContent: 'center',alignSelf: 'stretch',width:'100%'}}
                    text={this.props.language.name}
                    onPress={() => this.CombineFunction(this.props.language.id)}
                />
            </View>     
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom: 15,
    },
});


const mapDispatchToProps = (dispatch) => {  
    return {
        toggleLangId: choosenPerf => dispatch(toggleLang(choosenPerf))
    };
}


export default connect(null, mapDispatchToProps)(LanguageItem);
