import React from 'react';
import { View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent'
import UniformButton from "../Components/UniformButton"
import { togglePerf } from "TheaterSchedule/Actions/StreamActions/StreamActionCreator"

class PerformanceStreamItem extends LocalizedComponent {
    constructor() {
        super();
    }

    pressedLanguageHandler = () => {
        this.props.navigation.navigate("streamLanguageScreen");
    }

    CombineFunction(id) {
        console.log("sadasd")
        this.props.togglePerfId(id);
        this.pressedLanguageHandler();
    }

    render() {
        return (
            <View style={styles.container}>
                <UniformButton style={{ flex: 1,flexDirection: 'row', justifyContent: 'center',alignSelf: 'stretch',}}
                    text={this.props.performance.title}
                    onPress={()=>this.CombineFunction(this.props.performance.id)}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom: 15,
        height: 50,
    },
});


const mapDispatchToProps = (dispatch) => {
    return {
        togglePerfId: choosenPerf => dispatch(togglePerf(choosenPerf))
    };
}

export default connect(null, mapDispatchToProps)(PerformanceStreamItem);
