import {
    LOAD_PERFORMANCE_BEGIN,
    LOAD_PERFORMANCE_SUCCESS,
    LOAD_PERFORMANCE_FAILURE,
    STORE_PERFORMANCE_BEGIN,
    STORE_PERFORMANCE_SUCCESS,
    STORE_PERFORMANCE_FAILURE
} from 'TheaterSchedule/Actions/WishListActions/WishListActionTypes';

export const loadPerformanceToWishListBegin = () => ({
    type: LOAD_PERFORMANCE_BEGIN
  });
  
  export const loadPerformanceToWishListSuccess = (deviceId, performanceId) => ({
    type: LOAD_PERFORMANCE_SUCCESS,
    payload: { deviceId, performanceId }
  });
  
  export const loadPerformanceToWishListFailure = error => ({
    type: LOAD_PERFORMANCE_FAILURE,
    payload: { error }
  });
  
  export const storePerformanceToWishListBegin = () => ({
    type: STORE_PERFORMANCE_BEGIN
  });
  
  export const storePerformanceToWishListSuccess = performanceId => ({
    type: STORE_PERFORMANCE_SUCCESS,
    payload: { performanceId }
  });
  
  export const storePerformanceToWishListFailure = error => ({
    type: STORE_PERFORMANCE_FAILURE,
    payload: { error }
  });

export const SaveOrDeletePerformance = (deviceId, performanceId) => {
    return dispatch => {
      dispatch(storePerformanceToWishListBegin());
      fetch(`${BASE_URL}wishlist/${deviceId}?performanceId=${performanceId}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(performanceId)
      })
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res;
        })
        .then(() => {
          dispatch(storePerformanceToWishListSuccess(performanceId));
        })
        .catch(error => dispatch(storePerformanceToWishListFailure(error)));
    };
  };
