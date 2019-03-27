import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import { isBase64 } from 'is-base64';

import CustomText from '../Components/CustomText'

import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent'
import UniformButton from "../Components/UniformButton"

class PerformanceItem extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    pressedDetailsHandler = () => {
        this.props.navigation.navigate("performanceStack", { performance: this.props.performance.performanceId });
    }

    convertToReadableTime = date => {
        return this.props.moment(date).format("HH:mm");
    }

    convertToReadableDate = date => {
        return this.props.moment(date).format("dddd, Do MMMM");
    }

    render() {
        let base64Image = isBase64(this.props.performance.mainImage)
            ? `data:image/png;base64,${this.props.performance.mainImage}`
            : this.props.performance.mainImage;

        return (
            <View style={styles.performanceContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{ uri: base64Image }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <CustomText style={styles.title}>{this.props.performance.title}</CustomText>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.additionalInfo}>
                            {this.t('Date')}: {this.convertToReadableDate(this.props.performance.beginning)}
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.additionalInfo}>
                            {this.t('Beginning')}:
                        </Text>
                        <TouchableOpacity>
                            <Text
                                style={[styles.additionalInfo, { borderBottomWidth: 2, borderBottomColor: '#7154b8' }]}
                            >
                                {this.convertToReadableTime(this.props.performance.beginning)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <UniformButton
                            text={this.t('Details')}
                            onPress={this.pressedDetailsHandler}
                        />
                        <UniformButton
                            text={this.t('Buy ticket')}
                            onPress={() => Linking.openURL(this.props.performance.redirectToTicket)}
                        />
                    </View>

                </View>
            </View >
        );
    }
}

const QUARTER_OF_WINDOW_HEIGHT = Dimensions.get('window').height * 0.25;

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        height: 50,
    },
    performanceContainer: {
        height: QUARTER_OF_WINDOW_HEIGHT,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#7154b8',
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
    },
    buttonContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    imageContainer: {
        flex: 1,
        margin: 2,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 30,
    },
    infoContainer: {
        flex: 2,
        borderLeftColor: '#7154b8',
        borderLeftWidth: 1,
        margin: 2,
        justifyContent: 'space-between',
    },
    detailsContainer: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: '#7154b8',
        textAlign: 'center',
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#7154b8',
    },
    imagestyle: {
        width: 25,
        height: 25,
    },
    additionalInfo: {
        fontSize: 16,
        color: '#7154b8',
    },
    detailsButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    }
});

const mapStateToProps = state => {
    return {
        moment: state.settings.moment,
    }
}

export default connect(mapStateToProps)(PerformanceItem);
