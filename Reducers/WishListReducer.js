import {
    LOAD_PERFORMANCE_BEGIN,
    LOAD_PERFORMANCE_SUCCESS,
    LOAD_PERFORMANCE_FAILURE,
    STORE_PERFORMANCE_BEGIN,
    STORE_PERFORMANCE_SUCCESS,
    STORE_PERFORMANCE_FAILURE
} from 'TheaterSchedule/Actions/WishListActions/WishListActionTypes';

const initialState = {
    chosenperformances: [
    ],
    performanceId: null,
    loading: false,
    error: null,
    deviceId: null
}

export default function WishlistReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PERFORMANCE_BEGIN:
        case STORE_PERFORMANCE_BEGIN:
          return {
            ...state,
            loading: true,
            error: null
          };
    
        case LOAD_PERFORMANCE_SUCCESS:
          return {
            ...state,
            loading: false,
            deviceId: action.payload.deviceId,
            performanceId: { ...action.payload.performanceId }
          };
        case STORE_PERFORMANCE_SUCCESS:
          return {
            ...state,
            loading: false,
            performanceId: { ...action.payload.performanceId }
          };
    
        case LOAD_PERFORMANCE_FAILURE:
        case STORE_PERFORMANCE_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.error
          };      

        default: {
            return state;
        }
    }
}
