import {
  LOAD_WISHLIST_BEGIN,
  LOAD_WISHLIST_SUCCESS,
  LOAD_WISHLIST_FAILURE,
  STORE_PERFORMANCE_BEGIN,
  STORE_PERFORMANCE_SUCCESS,
  STORE_PERFORMANCE_FAILURE,
  DELETE_FROM_WISHLIST
} from 'TheaterSchedule/Actions/WishListActions/WishListActionTypes';

const initialState = {
  chosenPerformances: [
  ],
  performanceId: null,
  isLoadNow: false,
  error: null,
}

export default function wishListReducer(state = initialState, action) {
  switch (action.type) {

    case DELETE_FROM_WISHLIST: {
      let chosenPerformances = state.chosenPerformances;
      let index = chosenPerformances.findIndex(item => item.performanceId == action.payload.performanceId);
      chosenPerformances.splice(index, 1);
      return { ...state, chosenPerformances }
    }

    case LOAD_WISHLIST_BEGIN:
      return {
        ...state,
        isLoadNow: true,
        error: null
      };
    case STORE_PERFORMANCE_BEGIN:
      return {
        ...state,
        isLoadNow: true,
        error: null
      };

    case LOAD_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoadNow: false,
        chosenPerformances: action.payload.performances,
      };
    case STORE_PERFORMANCE_SUCCESS:
      return {
        ...state,
        isLoadNow: false,
        performanceId: { ...action.payload.performanceId }
      };

    case LOAD_WISHLIST_FAILURE:
      
      return { 
        ...state,
        isLoadNow: false,
        error: action.payload.error
      };

    case STORE_PERFORMANCE_FAILURE:
      return {
        ...state,
        isLoadNow: false,
        error: action.payload.error
      };

    default: {
      return state;
    }
  }
}
