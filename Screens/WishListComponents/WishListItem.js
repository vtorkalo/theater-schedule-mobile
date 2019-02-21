import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { SaveOrDeletePerformance } from 'TheaterSchedule/Actions/WishListActions/WishListActionCreators';
import { changeStatusPerformance } from 'TheaterSchedule/Actions/PerformanceCreator';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent'
import moment from 'moment';
import 'moment/locale/uk';

class WishListItem extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    pressedDetailsHandler = () => {
        this.props.navigation.navigate("performanceStack", { performance: this.props.chosenperformance.performanceId});
    }

    convertToReadableTime = date => {
        return moment(date).format("HH:mm");
    }

    convertToReadableDate = date => {
        return moment(date).format("dddd, Do MMMM");
    }

    deletefromWishlist = (item) => {
        if (item.isChecked == true){
            this.props.SaveOrDeletePerformance(deviceId, performanceId);
            this.props.changeStatusPerformance(item.performanceId);    
        }
    }

    render() {
        let base64Image = `data:image/png;base64,${this.props.chosenperformance.mainImage}`;

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
                    <Text style={styles.title}>{this.props.chosenperformance.title}</Text>
                    <View style={styles.detailsContainer}>
                        <TouchableOpacity onPress={this.pressedDetailsHandler}>
                            <View style={styles.detailsButton}>
                                <Text style={styles.buttonText}>
                                    {this.t('Details')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.deletefromWishlist(this.props.chosenperformance)}>
                            <View style={styles.detailsButton}>
                                <Text style={styles.buttonText}>
                                    {this.t('Remove from favourites')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        );
    }
}

const QUARTER_OF_WINDOW_HEIGHT = Dimensions.get('window').height * 0.25;

const styles = StyleSheet.create({
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
    changeStatusPerformance,
    SaveOrDeletePerformance,
}

export default connect(mapStateToProps, mapDispatchToProps)(WishListItem);
