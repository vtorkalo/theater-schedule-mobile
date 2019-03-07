import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import  ExcursionItem from './ExcursionItem'

class ExcursionList extends Component {   
    render() {
        return (
            <FlatList
                style={styles.List}
                data={this.props.excursions}
                keyExtractor={(item) => item.fullDescription.toString()}  
                renderItem={({ item }) => (<ExcursionItem excursion={item}/>)}                              
            />
        );
    }
}

const styles = StyleSheet.create({
    List: {
        width: '100%',
    },
});

const mapStateToProps = state => {
    return {
        excursions: state.excursionReducer.excursions,
    }
}

export default connect(mapStateToProps)(ExcursionList); 