import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { loadPerformance } from 'TheaterSchedule/Actions/PerformanceCreator';
import PerformanceMainInfo from '../Screens/PerformanceMainInfo';


class PerformanceScreen extends Component {

    componentWillMount() {
        this.props.loadPerformance(this.props.performanceId, this.props.languageCode);

    };

    render() {
        // const test = this.props.navigation.getParam('photo', "s");
        //var base64Image = `data:image/png;base64,${this.props.performance.mainImage}`;
        //    console.log(test);
        let base64Image = `data:image/png;base64,${this.props.navigation.getParam('photo', "s")}`;
        return (

            <Container>
                <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />

                <Content contentContainerStyle={styles.contentContainer}>

                    <ScrollView style={{ flex: 1, backgroundColor: "#BFD0D6" }}>
                        {/* <PerformanceMainInfo photo={this.props.navigation.getParam('photo', "s")}/> */}
                        <View style={{ flex: 3, alignItems: "center" }} >
                            <Image
                                style={{
                                    flex: 1, marginTop: 10,
                                    marginBottom: 10,
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    width: 200, height: null
                                }}
                                resizeMode='cover'
                                source={{ uri: base64Image }}

                            />
                        </View>

                        <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }} >
                            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 10, }} >{this.props.performance.title} ({this.props.performance.minimumAge}+)</Text>
                            <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>АВТОР</Text>
                            <Text style={{ fontFamily: "serif", fontWeight: "300", marginBottom: 10, }}>Тарас Тимчук</Text>
                            <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>ОПИС</Text>
                            <Text>{this.props.performance.description}</Text>
                            <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>ЦІНА</Text>
                            <Text>{this.props.performance.minPrice} - {this.props.performance.maxPrice}</Text>
                            <Text style={{ fontWeight: "bold", color: "gray", marginBottom: 5 }}>ХЕШ-ТЕГИ</Text>
                            <Text>{this.props.performance.hashTag}</Text>
                            <View style={{ marginBottom: 10 }} />

                        </View>

                    </ScrollView>
                </Content>
            </Container>
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
        languageCode: state.settings.settings.languageCode,
        performanceId: state.scheduleReducer.performanceId,
        performance: state.performanceReducer.performance,

    }
}

const mapDispatchToProps = {
    loadPerformance,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceScreen);

