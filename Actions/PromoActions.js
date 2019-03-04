import BASE_URL from 'TheaterSchedule/baseURL';

export const LOAD_PERFORMANCE_BEGIN = "LOAD_PERFORMANCE_BEGIN";
export const LOAD_PERFORMANCE_SUCCESS = "LOAD_PERFORMANCE_SUCCESS";
export const LOAD_PERFORMANCE_FAILURE = "LOAD_PERFORMANCE_FAILURE";

export const loadPromoActionsBegin = () => ({
    type: LOAD_PROMOACTIONS_BEGIN
  });
  
  export const loadPromoActionsSuccess = (promoActions) => ({
    type: LOAD_PROMOACTIONS_SUCCESS,
    payload: { promoActions }
  });
  
  export const loadPromoActionsFailure = error => ({
    type: LOAD_PROMOACTIONS_FAILURE,
    payload: { error }
  });

  export function LoadPromoActions(languageCode) {
    return (dispatch) => {
        fetch(`${BASE_URL}PromoAction/${languageCode}/LoadAvailable`)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(loadPromoActionsSuccess(responseJson));
            })
            .catch((error) => {
                dispatch(loadPromoActionsFailure(error))
            })
    }
}