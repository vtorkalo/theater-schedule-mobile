import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#F4E7EE',
    background2: '#BFD0D6'
};
export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.background2,
    },
    postersContainer: {
        paddingVertical: 30,
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible'
    },
    sliderContentContainer: {
        paddingVertical: 10
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});