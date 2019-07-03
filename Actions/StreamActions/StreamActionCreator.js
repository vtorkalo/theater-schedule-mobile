import * as ActionTypes from './StreamActionTypes'

export const fetchPerfomancesFailure = (bool) => {
    return {
        type: ActionTypes.FETCH_PERFORMANCE_FAILURE,
        hasErrored: bool
    };
};

export const togglePerf = (choosenPerf) => {

    return {
        type: ActionTypes.TOGGLE_PERF,
        choosenPerf
    };
};

export const toggleLang = (choosenLang) => {
    return {
        type: ActionTypes.TOGGLE_LANG,
        choosenLang
    }
}

export const toogleIsConnect = (bool) =>{
    return{
        type: ActionTypes.TOGGLE_ISCONNECTED,
        isConnected:bool
    }
}



export const fetchPerfomancesRequest = (bool) => {
    return {
        type: ActionTypes.FETCH_PERFORMANCE_REQUEST,
        isFetching: bool
    };
};


export const fetchPerfomancesSuccess = (performances) => {
    return {
        type: ActionTypes.FETCH_PERFORMANCE_SUCCESS,
        performances
    };
};


export const fetchLanguagesSucces = (languages) =>{
    return{
        type:ActionTypes.FETCH_LANGUAGES_SUCCESS,
        languages
    }
}

export function getData(url) {
    return (dispatch) => {
        dispatch(fetchPerfomancesRequest(true));

        return fetch(url)
            .then(
                response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }


                    dispatch(fetchPerfomancesRequest(false));

                    return response.json();

                }
            )
            .then((performances) => dispatch(fetchPerfomancesSuccess(performances)))
            .catch(error => dispatch(fetchPerfomancesFailure(true)));
    }
}



export  function getLanguageData(url) {
    return (dispatch) => {
        dispatch(fetchPerfomancesRequest(true));

        return fetch(url)
            .then(
                response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }


                    dispatch(fetchPerfomancesRequest(false));

                    return response.json();

                }
            )
            .then((languages) => dispatch(fetchLanguagesSucces(languages)))
            .catch(error => dispatch(fetchPerfomancesFailure(true)));
    }
}