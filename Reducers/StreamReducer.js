import * as ActionTypes from '../Actions/StreamActions/StreamActionTypes';

const initialState = {
    performances: [],
    languages: [],
    choosenPerf: 0,
    choosenLang: 0,
    hasErrored: false,
    isFetching: false,
    isConnected: false,
    connection: Object
}

export default function streamReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_PERFORMANCE_SUCCESS: {
            return {
                ...state,
                performances: action.performances,
            }
        }
        case ActionTypes.TOGGLE_CONNECTION:{
            return{
                ...state,
                connection:action.connection
            }
        }
        case ActionTypes.FETCH_LANGUAGES_SUCCESS: {
            return {
                ...state,
                languages: action.languages,
            }
        }
        case ActionTypes.FETCH_PERFORMANCE_FAILURE: {
            return {
                ...state,
                hasErrored: action.hasErrored,
            }
        }
        case ActionTypes.FETCH_PERFORMANCE_REQUEST: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case ActionTypes.TOGGLE_ISCONNECTED: {
            return {
                ...state,
                isConnected: action.isConnected,
            }
        }
        case ActionTypes.TOGGLE_PERF: {
            return {
                ...state,
                choosenPerf: action.choosenPerf,
            }
        }
        case ActionTypes.TOGGLE_LANG: {         
            return {
                ...state,
                choosenLang: action.choosenLang
            }
        }
        default: {
            return state;
        }
    }
}