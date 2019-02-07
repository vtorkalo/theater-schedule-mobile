import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LocalizeComponent from '../../Localization/LocalizedComponent';

class Header extends LocalizeComponent {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{this.t('Settings')}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center'
    },
    header: {
        color: '#7154b8',
        margin: 4,
        paddingBottom: 2,
        fontSize: 25,
        textAlign: 'center',
    }
})

export default Header;
