import {
    LOAD_PERFORMANCE_BEGIN,
    LOAD_PERFORMANCE_SUCCESS,
    LOAD_PERFORMANCE_FAILURE,
    CNANGE_STATUS_PERFORMANCE,
} from "./PerformanceTypes";
import BASE_URL from 'TheaterSchedule/baseURL';
import {
    AsyncStorage
  } from "react-native";

export const changeStatusPerformance = (isChecked) => ({
    type: CNANGE_STATUS_PERFORMANCE,
    payload: {isChecked},
});

export const loadPerformanceBegin = () => ({
    type: LOAD_PERFORMANCE_BEGIN,
});

export const loadPerformanceSuccess = (performance) => ({
    type: LOAD_PERFORMANCE_SUCCESS,
    payload: { performance },
});

export const loadPerformanceFailure = (error) => ({
    type: LOAD_PERFORMANCE_FAILURE,
    payload: { error },
});

export const loadPerformance = (deviceId, performanceId, languageCode) => {
    return async dispatch => {
        dispatch(loadPerformanceBegin());
        let Accountid= await AsyncStorage.getItem('UserId');
        console.log(Accountid);
        let url = `${BASE_URL}PerformanceDetails/${Accountid}/${languageCode}/GetInfo/${performanceId}`;
        return fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                dispatch(loadPerformanceSuccess(responseJson));
            })
            .catch(error => { dispatch(loadPerformanceFailure(error)) });
    };
};