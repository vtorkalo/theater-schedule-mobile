import BASE_URL from 'TheaterSchedule/baseURL';

export const SET_SLIDE = 'SET_SLIDE';
export const SET_POSTERS_SUCCESS = 'SET_POSTERS_SUCCESS';
export const SET_POSTERS_FAILURE='SET_POSTERS_FAILURE';

export function setSliderActiveSlide(index) {
    return {
        type: SET_SLIDE,
        payload: { index }
    }
}

export function fetchPosters(languageCode) {
    return (dispatch) => {

        fetch(`${BASE_URL}posters/${languageCode}`)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setPostersSuccess(responseJson));
                return responseJson;
            })
            .catch((error) => {
                dispatch(setPostersFailure(error))
            })
    }
}


export const setPostersSuccess = (posters) => ({
    type: SET_POSTERS_SUCCESS,
    payload: { posters }
});

export const setPostersFailure = (error) => ({
    type: SET_POSTERS_FAILURE,
    payload: {error}
});

