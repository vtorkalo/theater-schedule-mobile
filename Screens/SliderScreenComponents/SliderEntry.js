import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntryStyles'
import { withNavigation } from 'react-navigation';
import { isBase64 } from 'is-base64'
import Text from '../Components/CustomText';

class SliderEntry extends Component {

    get image() {
        const { data: { mainImage }, parallax, parallaxProps } = this.props;
        return parallax ? (
            <ParallaxImage
            source={{ uri: isBase64(mainImage) ? `data:image/png;base64,${mainImage}` : mainImage }}
                style={styles.image}
                containerStyle={styles.imageContainer}
                {...parallaxProps}
            />
        ) : (
                <Image
                source={{ uri: isBase64(mainImage) ? `data:image/png;base64,${mainImage}` : mainImage }}
                    style={styles.image}
                />
            );
    }

    render() {
        const { data: { title, performanceId } } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title]}
                numberOfLines={2}
            >
                {title.toUpperCase()}
            </Text>
        ) : false;
        const PerformanceId = performanceId;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={() => this.props.navigation.navigate("performanceStack", { performance: PerformanceId })}
            >
                <View style={styles.shadow}>
                <View style={[styles.imageContainer]}>
                    {this.image}
                    <View style={[styles.radiusMask]} />
                </View>
                <View style={[styles.textContainer]}>
                    {uppercaseTitle}
                </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(SliderEntry);
