import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntryStyles'
import { withNavigation } from 'react-navigation';


class SliderEntry extends Component {

    get image() {
        const { data: { mainImage }, parallax, parallaxProps, even } = this.props;
        return parallax ? (
            <ParallaxImage
                source={{ uri: `data:image/png;base64,${mainImage}` }}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
                <Image
                    source={{ uri: `data:image/png;base64,${mainImage}` }}
                    style={styles.image}
                />
            );
    }
    pressedDetailsHandler = () =>{
        this.props.navigation.navigate("performanceStack",{photo:this.props.performance.mainImage});
    }
    render() {
        const { data: { title, subtitle}, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
            >
                {title.toUpperCase()}
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={()=> this.props.navigation.navigate("performanceStack")}
            >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    {this.image}
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    {uppercaseTitle}
                    <Text
                        style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                        numberOfLines={2}
                    >
                        {subtitle}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(SliderEntry);
