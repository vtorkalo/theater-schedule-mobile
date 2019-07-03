import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LocalizedComponent from 'TheaterSchedule/Localization/LocalizedComponent';
import LanguageItem from './LanguageItem';

class LanguagesList extends LocalizedComponent {

    render() {
        return (    
                <FlatList
                        style={styles.container}
                        data={this.props.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <LanguageItem navigation={this.props.navigation} language={item} />
                        )}
                    />
        );
    }
}


const styles = StyleSheet.create({
    performanceList: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',


    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    },

});

const mapStateToProps = (state) => {
    return {
        data: state.streamReducer.languages,
        performaceId: state.streamReducer.choosenPerf
    }
}

export default connect(mapStateToProps)(LanguagesList);
