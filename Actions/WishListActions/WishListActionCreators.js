import BASE_URL from "../../baseURL";
import {
  AsyncStorage
} from "react-native";
import {
  LOAD_WISHLIST_BEGIN,
  LOAD_WISHLIST_SUCCESS,
  LOAD_WISHLIST_FAILURE,
  STORE_PERFORMANCE_BEGIN,
  STORE_PERFORMANCE_SUCCESS,
  STORE_PERFORMANCE_FAILURE,
  DELETE_FROM_WISHLIST,
} from 'TheaterSchedule/Actions/WishListActions/WishListActionTypes';

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

export const loadWishListFailure = (error) => ({
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

export const storePerformanceToWishListFailure = (error) => ({
  type: STORE_PERFORMANCE_FAILURE,
  payload: { error }
});

export const SaveOrDeletePerformance = (Accountid, performanceId) => {
  return async dispatch => {     
    dispatch(storePerformanceToWishListBegin());
    let Accountid= await AsyncStorage.getItem('UserId');
    var accessToken = await AsyncStorage.getItem('AccessToken');
    fetch(`${BASE_URL}wishlist/${Accountid}?performanceId=${performanceId}`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + `${accessToken}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(performanceId)
    })
      .then( async(response) => {

        if (response.status == 401){
          throw new Error('Unauthorized');
        }

        if (!response.ok) {          
          throw new Error('Some problems!!!');
      }

        const headersAccessToken = response.headers.get('newaccess_token');

        if(headersAccessToken != null)
        {
          await AsyncStorage.setItem('AccessToken', headersAccessToken); 
        }     
        return response;
      })
      .then(() => {
        dispatch(storePerformanceToWishListSuccess(performanceId));
      })
      .catch(error => dispatch(storePerformanceToWishListFailure(error)));
  };
};
 
export const loadWishList = (Accountid, languageCode) => {     
    return async dispatch => {        
    dispatch(loadWishListBegin());      
    var accessToken = await AsyncStorage.getItem('AccessToken'); 
    let Accountid= await AsyncStorage.getItem('UserId');
    let url = `${BASE_URL}wishlist/${Accountid}/${languageCode}`;
    fetch(url, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + `${accessToken}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then( async (response) => {
         if (response.status == 401){
          throw new Error('Unauthorized');
        }

        if (!response.ok) {          
          throw new Error('Some problems!!!');
      }
        const headersAccessToken = response.headers.get('newaccess_token');

        if(headersAccessToken != null)
        {
          await AsyncStorage.setItem('AccessToken', headersAccessToken); 
        }     
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