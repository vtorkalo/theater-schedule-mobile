import BASE_URL from 'TheaterSchedule/baseURL';

export const LOAD_EVENTS_BEGIN = "LOAD_EVENTS_BEGIN";
export const LOAD_EVENTS_SUCCESS = "LOAD_EVENTS_SUCCESS";
export const LOAD_EVENTS_FAILURE = "LOAD_EVENTS_FAILURE";

export const loadEventsBegin = () => ({
    type: LOAD_EVENTS_BEGIN
  });

  export const loadEventsSuccess = (events) => ({
    type: LOAD_EVENTS_SUCCESS,
    payload: { events }
  });

  export const loadEventsFailure = error => ({
    type: LOAD_EVENTS_FAILURE,
    payload: { error }
  });

  export const loadEvents= (languageCode) => {
    return dispatch => {
        dispatch(loadEventsBegin());

        let url = `${BASE_URL}Event/${languageCode}/LoadEvents`;

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                dispatch(loadEventsSuccess(responseJson));
            })
            .catch(error => {
                dispatch(loadEventsFailure(error));
            });
    };
};
