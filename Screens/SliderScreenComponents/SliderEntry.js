import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntryStyles'
import { withNavigation } from 'react-navigation';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';

class SliderEntry extends Component {

    get image() {
        const { data: { mainImage }, parallax, parallaxProps } = this.props;
        return parallax ? (
            <ParallaxImage
                source={{ uri: `data:image/png;base64,${mainImage}` }}
                containerStyle={styles.imageContainer}
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
        console.log('test');
         console.log(this.props.mainImage);
         console.log(this.props);
         console.log(this.props.data);
         this.props.navigation.navigate("performanceStack");

    }
    render() {
        const { data: { title, performanceId}} = this.props;

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
                onPress={()=> this.props.navigation.navigate("performanceStack",{performance:PerformanceId}) }
                // this.props.navigation.navigate("performanceStack")
            >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer]}>
                    {this.image }
                    <View style={[styles.radiusMask]} />
                </View>
                <View style={[styles.textContainer]}>
                    {uppercaseTitle}
                    <Text
                        style={[styles.subtitle]}
                        numberOfLines={2}
                    >
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(SliderEntry);
