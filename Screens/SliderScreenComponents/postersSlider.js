import React from 'react';
import { View } from 'react-native';
import styles from './indexStyles';
import { sliderWidth, itemWidth } from './SliderEntryStyles';
import Carousel from 'react-native-snap-carousel';

import Text from '../Components/CustomText';

export default PostersSlider = (props) => {
 
    return (      
        <View style={styles.postersContainer}>
            <Text type="bold" style={styles.title}>{props.title}</Text>
            <Carousel
                data={props.posters}
                renderItem={props.renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                firstItem={0}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={false}
                onSnapToItem={props.setActiveSlide}
                removeClippedSubviews={false}
            />            
        </View>
    );
}

