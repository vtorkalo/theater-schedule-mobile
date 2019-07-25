import {
  LOAD_WISHLIST_BEGIN,
  LOAD_WISHLIST_SUCCESS,
  LOAD_WISHLIST_FAILURE,
  STORE_PERFORMANCE_BEGIN,
  STORE_PERFORMANCE_SUCCESS,
  STORE_PERFORMANCE_FAILURE,
  DELETE_FROM_WISHLIST,
} from 'TheaterSchedule/Actions/WishListActions/WishListActionTypes';
import BASE_URL from 'TheaterSchedule/baseURL';

export const deleteFromWishlist = (performanceId) => ({
  type: DELETE_FROM_WISHLIST,
  payload: {
    performanceId
  },
});

export const loadWishListBegin = () => ({
  type: LOAD_WISHLIST_BEGIN
});

export const loadWishListSuccess = (performances, deviceId, languageCode) => ({
  type: LOAD_WISHLIST_SUCCESS,
  payload: { performances, deviceId, languageCode }
});

export const loadWishListFailure = error => ({
  type: LOAD_WISHLIST_FAILURE,
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

export const loadWishList = (deviceId, languageCode) => {
  return dispatch => {
    dispatch(loadWishListBegin());
    let url = `${BASE_URL}wishlist/${deviceId}/${languageCode}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        dispatch(loadWishListSuccess(responseJson, deviceId, languageCode));
      })
      .catch(error => {
        dispatch(loadWishListFailure(error));
      });
  };
};
