import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#F4E7EE',
    background2: '#BFD0D670',
    headerBackground: '#7154b8'
};
export default StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor:colors.background2,
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    slider: {
        marginTop: 8,
        overflow: 'visible'
    },
    paginationContainer: {
        paddingVertical: 10
    },
    paginationDot: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        shadowColor: colors.black,
        shadowOpacity: 0.27,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 0.17,
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    inactivePaginationDot: {
        backgroundColor: 'rgb(0,0,0)',
    }
});