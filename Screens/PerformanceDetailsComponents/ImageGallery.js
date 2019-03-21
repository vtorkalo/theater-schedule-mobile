import React from 'react';
import { ScrollView, StyleSheet, FlatList, Text } from 'react-native';

export default ImageGallery = (props) => {
    return (
        <ScrollView>
            <Text style={styles.text}>{props.galleryTitle}</Text>
            <FlatList
                horizontal
                data={props.images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={props.showImage}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
    }
})