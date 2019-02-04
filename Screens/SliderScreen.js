import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Container, Content } from 'native-base';
import DrawerMenucIcon from '../Navigation/DrawerMenuIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import entries from '../entries.json';
import PostersSlider from './SliderScreenComponents/postersSlider';
import { connect } from 'react-redux';
import { setSliderActiveSlide } from '../Actions/ActionCreators';
import SliderEntry from './SliderScreenComponents/SliderEntry';
import styles from '../Screens/SliderScreenComponents/indexStyles';

let posters = JSON.parse(JSON.stringify(entries));

class SliderScreen extends Component {
    static navigationOptions = {
        drawerIcon: <MaterialCommunityIcons name='calendar-clock' size={25} />
    }

    renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }


    render() {
        return (
            <Container style={{ flex: 1 }}>
                <DrawerMenucIcon onPressMenuIcon={() => this.props.navigation.openDrawer()} />
                <Content contentContainerStyle={styles.contentContainer}>
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.container}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <PostersSlider
                                    posters={posters}
                                    renderItemWithParallax={this.renderItemWithParallax}
                                    setActiveSlide={(index) => this.props.setSliderActiveSlide(index)}
                                    postersLength={posters.length}
                                    activeSlide={this.props.sliderActiveSlide}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </Content>
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return {
        sliderActiveSlide: state.sliderActiveSlide.sliderActiveSlide

    }
}
const mapDispatchToProps = {
    setSliderActiveSlide,
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderScreen)
