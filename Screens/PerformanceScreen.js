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

        //var base64Image = `data:image/png;base64,${this.props.performance.mainImage}`;
        //console.log(base64Image);

        return (
            <Container>
                <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />

                <Content contentContainerStyle={styles.contentContainer}>

                    <ScrollView style={{ flex: 1, backgroundColor: "#BFD0D6" }}>
                        <PerformanceMainInfo />

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

