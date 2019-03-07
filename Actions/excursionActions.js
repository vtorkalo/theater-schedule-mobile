import BASE_URL from 'TheaterSchedule/baseURL';

export const LOAD_EXCURSIONS_BEGIN = "LOAD_EXCURSIONS_BEGIN";
export const LOAD_EXCURSIONS_SUCCESS = "LOAD_EXCURSIONS_SUCCESS";
export const LOAD_EXCURSIONS_FAILURE = "LOAD_EXCURSIONS_FAILURE";

export const loadExcursionsBegin = () => ({
    type: LOAD_EXCURSIONS_BEGIN
  });

  export const loadExcursionsSuccess = (excursions) => ({
    type: LOAD_EXCURSIONS_SUCCESS,
    payload: { excursions }
  });

  export const loadExcursionsFailure = error => ({
    type: LOAD_EXCURSIONS_FAILURE,
    payload: { error }
  });

  export const loadExcursions= (languageCode) => {
    return dispatch => {
        dispatch(loadExcursionsBegin());

        let url = `${BASE_URL}Excursion/${languageCode}/LoadAvailable`;

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                dispatch(loadExcursionsSuccess(responseJson));
            })
            .catch(error => {
                dispatch(loadExcursionsFailure(error));
            });
    };
};
