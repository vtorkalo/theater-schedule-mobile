import BASE_URL from 'TheaterSchedule/baseURL';

export const SET_SLIDE = 'SET_SLIDE';
export const SET_POSTERS_SUCCESS = 'SET_POSTERS_SUCCESS';
export const SET_POSTERS_FAILURE = 'SET_POSTERS_FAILURE';
export const LOAD_POSTERS_BEGIN = 'LOAD_POSTERS_BEGIN';

export function setSliderActiveSlide(index) {
    return {
        type: SET_SLIDE,
        payload: { index }
    }
}

export function fetchPosters(languageCode) {
    return (dispatch) => {
        dispatch(loadPostersBegin());
        fetch(`${BASE_URL}posters/${languageCode}`)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setPostersSuccess(responseJson));
            })
            .catch((error) => {
                dispatch(setPostersFailure(error))
            })
    }
}
export const loadPostersBegin = () => ({
    type:LOAD_POSTERS_BEGIN,
})
export const setPostersSuccess = (posters) => ({
    type: SET_POSTERS_SUCCESS,
    payload: { posters }
});

export const setPostersFailure = (error) => ({
    type: SET_POSTERS_FAILURE,
    payload: { error }
});

