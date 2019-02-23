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
import CheckBox from 'react-native-check-box';
import { addToWatchlist } from 'TheaterSchedule/Actions/WatchListActions/WatchListActionCreators';
import { changeStatusFromSchedule, deleteFromSchedule } from 'TheaterSchedule/Actions/ScheduleActions/ScheduleActionCreators';
import moment from 'moment';
import 'moment/locale/uk';
import { colors } from '../SliderScreenComponents/indexStyles';

import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent'

class PerformanceItem extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    togglewatchlist = (item, index) => {
        if (this.props.isChecked == undefined || this.props.isChecked == false) {
            this.props.addToWatchlist(item);
            this.props.changeStatusFromSchedule(index);
        } else {
            this.props.deleteFromSchedule(item.scheduleId);
            this.props.changeStatusFromSchedule(index);
        }
    }

    pressedDetailsHandler = () => {
        this.props.navigation.navigate("performanceStack", { performance: this.props.performance.performanceId });
    }



    convertToReadableTime = date => {
        return moment(date).format("HH:mm");
    }

    convertToReadableDate = date => {
        return moment(date).format("dddd, Do MMMM");
    }

    render() {
        let base64Image = `data:image/png;base64,${this.props.performance.mainImage}`;

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
                    <Text style={styles.title}>{this.props.performance.title}</Text>
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
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={this.pressedDetailsHandler}>
                            <View style={styles.detailsButton}>
                                <Text style={styles.buttonText}>
                                    {this.t('Details')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.starContainer}>
                            <CheckBox
                                onClick={() => this.togglewatchlist(this.props.performance, this.props.index)}
                                isChecked={this.props.isChecked}
                                checkedImage={<Image source={require('./Images/checked-star.png')} style={styles.imagestyle} />}
                                unCheckedImage={<Image source={require('./Images/unchecked-star.png')} style={styles.imagestyle} />}
                            />
                        </View>
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
        marginRight: 15,
        marginVertical: 5,
    },
    starContainer: {

    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imageContainer: {
        zIndex: -1,
        left: 15,
        flex: 2,
        shadowColor: colors.black,
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 10,
    },
    infoContainer: {
        zIndex: 1,
        borderRadius: 8,
        borderColor: '#7154b8',
        flex: 3,
        height: '75%',
        top: 25,
        backgroundColor: 'rgba(255,255,255,95)',
        justifyContent: 'space-between',
        shadowColor: colors.black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginHorizontal: 7,

        // justifyContent: 'space-between',
    },
    title: {
        color: '#7154b8',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 7
    },
    imagestyle: {
        width: 25,
        height: 25,
    },
    additionalInfo: {
        fontSize: 15,
        color: '#7154b8',
        margin: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsButton: {
        flex: 1,
        marginVertical: 9,
        backgroundColor: '#7154b8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 100
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    }
});

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    addToWatchlist,
    changeStatusFromSchedule,
    deleteFromSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceItem);
