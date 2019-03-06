import BASE_URL from 'TheaterSchedule/baseURL';

export const LOAD_PROMOACTIONS_BEGIN = "LOAD_PROMOACTIONS_BEGIN";
export const LOAD_PROMOACTIONS_SUCCESS = "LOAD_PROMOACTIONS_SUCCESS";
export const LOAD_PROMOACTIONS_FAILURE = "LOAD_PROMOACTIONS_FAILURE";

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

export const LoadPromoActions = (languageCode) => {
  return dispatch => {
      dispatch(loadPromoActionsBegin());
      
      let url = `${BASE_URL}PromoAction/${languageCode}/LoadAvailable`;
      fetch(url)
          .then(response => {
              return response.json();
          })
          .then(responseJson => {           
              dispatch(loadPromoActionsSuccess(responseJson));
          })
          .catch(error => {
              dispatch(loadPromoActionsFailure(error));
          });
  };
};