import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent'

class ExcursionItem extends LocalizedComponent {
    constructor(props) {
        super(props);
    }

    pressedDetailsHandler = () => {
        alert(this.props.excursion.fullDescription)
    }

    render() {
        let base64Image = `data:image/png;base64,${this.props.excursion.image}`;
        
        return (
            <View style={styles.excursionContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={{ uri: base64Image }}
                    />
                </View>    
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{this.props.excursion.excursionName}</Text>        
                    <View style={styles.detailsContainer}>
                        <Text style={styles.additionalInfo}>{this.props.excursion.shortDescription}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={this.pressedDetailsHandler}>
                            <View style={styles.detailsButton}>
                                <Text style={styles.buttonText}>
                                    {this.t('Details')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const QUARTER_OF_WINDOW_HEIGHT = Dimensions.get('window').height * 0.25;

const styles = StyleSheet.create({
    excursionContainer: {
        height: QUARTER_OF_WINDOW_HEIGHT,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#7154b8',
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
    },
    buttonContainer: {
        flex: 2,
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
    },
    title: {
        color: '#7154b8',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 2,
        margin: 4,
        borderBottomWidth: 2,
        borderBottomColor: '#7154b8',
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
        paddingBottom: 2,
    },
    detailsButton: {
        marginTop: 5,
        backgroundColor: '#7154b8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 100
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    // taskContainer: {        
    //     flex: 3,
    //     flexDirection: 'row',
    //     minHeight: 200,
    //     marginVertical: 10,        
    //     backgroundColor: '#eee',
    //     height: '80%',
    //     width: '100%',              
    //     borderBottomColor: '#ddd', borderBottomWidth: 1,        
    // },
});

export default ExcursionItem;
