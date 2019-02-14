import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loadPerformance } from 'TheaterSchedule/Actions/PerformanceCreator';



class PerformanceMainScreen extends Component {
constructor (props)
{
    super(props);
    this.state = {
        base64Image:`data:image/png;base64,${this.props.performance.mainImage}`
    }
}


    componentDidUpdate(prevProps) {
        // console.log("Prevprops.mainimage: ", prevProps.mainImage);
        // console.log("Prevprops.mainimage: ", this.props.performance.mainImage);
        if (!prevProps.photo && this.props.photo) {
           this.setState({base64Image : `data:image/png;base64,${this.props.performance.mainImage}`});
            // console.log(11);
            // this.forceUpdate();
            // console.log(this.state.base64Image);
            
        }

    };

    render() {
        
        //const photo = this.props.navigation.getParam('photo', 'NO-PHOTO');
       
        return (
            <View>

                <View style={{ alignItems: "center" }} >
                    <Image
                        style={{
                            flex: 1, marginTop: 10,
                            marginBottom: 10,
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        }}

                        //source={{ uri:photo }}
                        
                    />
                </View>

                <View style={{ marginLeft: 10, marginRight: 10 }} >
                    <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 10, }} >{this.props.performance.title} ({this.props.performance.minimumAge}+)</Text>
                    <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>АВТОР</Text>
                    <Text style={{fontWeight: "300", marginBottom: 10, }}>Тарас Тимчук</Text>
                    <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>ОПИС</Text>
                    <Text>{this.props.performance.description}</Text>
                    <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>ЦІНА</Text>
                    <Text>{this.props.performance.minPrice} - {this.props.performance.maxPrice}</Text>
                    <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>ХЕШ-ТЕГИ</Text>
                    <Text>{this.props.performance.hashTag}</Text>
                    <View style={{ marginBottom: 10 }} />

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',


    },
    contentContainer1: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
});

const mapStateToProps = state => {
    return {

        performance: state.scheduleReducer.performances,
        error: state.performanceReducer.error,

    }
}



export default connect(mapStateToProps)(PerformanceMainScreen);

