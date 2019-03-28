import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { SaveOrDeletePerformance, deleteFromWishlist } from 'TheaterSchedule/Actions/WishListActions/WishListActionCreators';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import { isBase64 } from "is-base64";
import Text from '../Components/CustomText';
import UniformButton from "../../Screens/Components/UniformButton";

class WishListItem extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    deletefromWishlist = () => {
        this.props.SaveOrDeletePerformance(this.props.deviceId, this.props.chosenperformance.performanceId);
        this.props.deleteFromWishlist(this.props.chosenperformance.performanceId);
    }

    pressedDetailsHandler = () => {
        this.props.navigation.navigate("performanceStack", { performance: this.props.chosenperformance.performanceId });
    }

    render() {
        let image = isBase64(this.props.chosenperformance.mainImage)
            ? `data:image/png;base64,${this.props.chosenperformance.mainImage}`
            : this.props.chosenperformance.mainImage;

        return (
            <View style={styles.performanceContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{ uri: image }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{this.props.chosenperformance.title}</Text>
                    <View style={styles.detailsContainer}>
                        <UniformButton
                            text={this.t('Details')}
                            style={styles.button}
                            onPress={this.pressedDetailsHandler}
                        />
                        <UniformButton
                            text={this.t('Remove from favourites')}
                            style={styles.button}
                            onPress={this.deletefromWishlist}
                        />
                    </View>
                </View>
            </View >
        );
    }
}

const QUARTER_OF_WINDOW_HEIGHT = Dimensions.get('window').height * 0.25;

const styles = StyleSheet.create({
    button: {
        margin: 6,
        minWidth:"78%",
        alignSelf: "center",
        justifyContent:"center"
    },
    performanceContainer: {
        height: QUARTER_OF_WINDOW_HEIGHT,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#7154b8',
        borderWidth: 2,
        borderRadius: 30,
        margin: 5,
    },
    starContainer: {
        flex: 2,
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
        borderRadius: 20,
    },
    infoContainer: {
        flex: 2,
        borderLeftColor: '#7154b8',
        borderLeftWidth: 2,
        justifyContent: 'space-between',
    },
    detailsContainer: {
        flex: 2,
        flexDirection: 'column',
        width: '100%',

        borderTopWidth: 2,
        borderTopColor: '#7154b8',
    },
    title: {
        color: '#7154b8',
        textAlign: 'center',
        fontSize: 20,
        margin: 5,
    },
    imagestyle: {
        width: 25,
        height: 25,
    },
    additionalInfo: {
        fontSize: 17,
        color: '#7154b8',
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 2,
    },
    detailsButton: {
        marginTop: 15,
        backgroundColor: '#7154b8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginRight: 10,
        marginLeft: 10,
        height: 30,
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    }
});

const mapStateToProps = (state) => {
    return {
        deviceId: state.settings.deviceId,
    };
}

const mapDispatchToProps = {
    SaveOrDeletePerformance,
    deleteFromWishlist
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListItem);
