import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import LocalizedComponent from '../../Localization/LocalizedComponent'

class PerformanceItem extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    pressedDetailsHandler = () => {
        alert('redirect to details page');
    }

    render() {
        let base64Image = `data:image/png;base64,${this.props.performance.mainImage}`;

        return (
            <View style={styles.performanceContainer}>
                {/* Container for image */}
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{ uri: base64Image }} />
                </View>

                {/* Container for some title and details button */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{this.props.performance.title}</Text>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.additionalInfo}>
                            {this.t('The closest session')}:
                        </Text>
                        <TouchableOpacity>
                            <Text style={[styles.additionalInfo, { borderBottomWidth: 2, borderBottomColor: '#7154b8' }]}>{this.props.performance.beggining}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.pressedDetailsHandler}>
                        <View style={styles.detailsButton}>
                            <Text style={styles.buttonText}>{this.t('Details')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    performanceContainer: {
        height: Dimensions.get('window').height * 0.25,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#7154b8',
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
    },
    imageContainer: {
        flex: 1,
        margin: 2,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    infoContainer: {
        flex: 2,
        borderLeftColor: '#7154b8',
        borderLeftWidth: 1,
        margin: 2,
        justifyContent: 'space-between',
    },
    detailsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#7154b8',
        textAlign: 'center',
        margin: 4,
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#7154b8',
        fontSize: 20,
    },
    additionalInfo: {
        fontSize: 17,
        textAlign: 'center',
        color: '#7154b8',
        margin: 2,
        paddingBottom: 2,
    },
    detailsButton: {
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#7154b8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    }
});

export default connect()(PerformanceItem);
