import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import ReturnMenuIcon from '../Navigation/ReturnMenuIcon';
import { NavigationActions } from 'react-navigation';
import { Container, Content } from 'native-base';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import { connect } from 'react-redux';
import Text from './Components/CustomText';

class EventDetailScreen extends LocalizedComponent {

    convertToReadableDate = date => {
        return this.props.moment(date).format("dddd, Do MMMM");
    }
    
    render() {

        const event = this.props.navigation.getParam('event');
        let base64Image = `data:image/png;base64,${event.image}`;

        return (
            <Container style={styles.container}>
                <ReturnMenuIcon onPressMenuIcon={() => this.props.navigation.dispatch(NavigationActions.back())} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <ScrollView>
                        <View style={styles.imageContainer} >
                            <Image
                                style={styles.image}
                                resizeMode='contain'
                                source={{ uri: base64Image }}
                            />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>{event.title}</Text>
                        </View>      

                        <View style={styles.textContainer} >
                                <Text style={styles.textSubtitle}>{this.t("description")}</Text>
                                <Text style={styles.testStyle}>{event.fullDescription}</Text>
                                <Text style={styles.textSubtitle}>{this.t("eventType")}</Text>
                                <Text style={styles.testStyle}>{event.type}</Text>
                                <Text style={styles.textSubtitle}>{this.t("Date")}:</Text>
                                <Text style={styles.testStyle}>{this.convertToReadableDate(event.date)}</Text>
                            </View>    
                    </ScrollView>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#BFD0D670'
    },
    textContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    imageContainer: {
        height: Dimensions.get('window').height * 0.6,
        alignItems: "center"
    },
    image: {
        flex: 1, marginTop: 10,
        marginBottom: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: Dimensions.get('window').width * 0.85,
        height: null
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
    },
    textSubtitle: {
        fontWeight: "bold",
        color: "gray",
        marginBottom: 5
    },
    testStyle: {
        fontWeight: "300",
        marginBottom: 10,
    },
});

const mapStateToProps = state => {
    return {
        moment: state.settings.moment,
    }
}

export default connect(mapStateToProps)(EventDetailScreen);
