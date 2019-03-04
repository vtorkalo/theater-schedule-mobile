import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import  PromoActionItem from './PromoActionItem'

class PromoActionsList extends Component {   
    render() {
        return (
            <View style={styles.promoActionList}>
                <FlatList>
                    data={this.props.promoActions}
                    keyExtractor={(item) => item.description.toString()}  
                    renderItem={({ item }) => <PromoActionItem promoAction={item}></PromoActionItem>}                              
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    promoActionList: {
        flex: 8,
        backgroundColor: "#BFD0D6",
    },
});

const mapStateToProps = state => {
    return {
        promoActions: state.PromoActionReducer.promoActions,
    }
}

export default connect(mapStateToProps)(PromoActionsList);