import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';

export default PerformanceItem = props => {
    let base64Image = 'data:image/png;base64,' + props.performance.mainImage;

    return (
        <View style={styles.performanceContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode='contain'
                    source={{ uri: base64Image }} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.performance.title}</Text>
                <Text style={styles.detail}>Duration: {props.performance.duration}</Text>
                <Text style={styles.detail}>Min price: {props.performance.minPrice}</Text>
                <Text style={styles.detail}>Max price: {props.performance.maxPrice}</Text>
                <View style={styles.detailsButton}>
                    <TouchableOpacity>
                        <Text>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
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
        justifyContent: 'space-between',
    },
    title: {
        textAlign: 'center',
        margin: 2,
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        fontSize: 20,
    },
    detail: {
        textAlign: 'center',
        margin: 2,
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#333',
    },
    detailsButton: {
        width: '100%',
        alignItems: "flex-end",
    },
});
