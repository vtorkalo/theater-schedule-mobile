import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

export default class Performance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [
                { start: '10:00', },
                { start: '12:00', },
                { start: '14:00', },
            ],
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.performanceContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{data: "uri"}} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View style={styles.datesContainer}>
                        {
                            this.state.dates.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.container}
                                    onPress={() => { }}>
                                    <Text>{item.start}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    performanceContainer: {
        height: Dimensions.get('window').height * 0.25,
        flexDirection: 'row',
        backgroundColor: '#b9ceeb',
        borderColor: '#ddd',
        borderWidth: 1,
        margin: 5,
    },
    imageContainer: {
        flex: 1,
        margin: 2,
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    infoContainer: {
        flex: 2,
        borderLeftColor: '#aaa',
        borderColor: '#000',
        borderLeftWidth: 1,
        margin: 2,
    },
    title: {
        textAlign: 'center',
        margin: 2,
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    datesContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    container: {
        margin: 2,
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#777',
    },
});
