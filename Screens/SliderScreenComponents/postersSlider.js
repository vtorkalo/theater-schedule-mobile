import React from 'react';
import { View, Text } from 'react-native';
import styles from './indexStyles';
import { sliderWidth, itemWidth } from './SliderEntryStyles';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default PostersSlider = (props) => {
    return (
        <View style={styles.postersContainer}>
            <Text style={styles.title}>{`Зараз у прокаті: `}</Text>
            <Carousel
                ref={c => this._slider1Ref = c}
                data={props.posters}
                renderItem={props.renderItemWithParallax}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                hasParallaxImages={true}
                firstItem={1}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={true}
                loopClonesPerSide={3}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={props.setActiveSlide}
            />
            <Pagination
                dotsLength={props.postersLength}
                activeDotIndex={props.activeSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={'black'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
            />
        </View>
    );
}

