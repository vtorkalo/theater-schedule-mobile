import {
  LOAD_WISHLIST_BEGIN,
  LOAD_WISHLIST_SUCCESS,
  LOAD_WISHLIST_FAILURE,
  STORE_PERFORMANCE_BEGIN,
  STORE_PERFORMANCE_SUCCESS,
  STORE_PERFORMANCE_FAILURE,
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST
} from 'TheaterSchedule/Actions/WishListActions/WishListActionTypes';

const initialState = {
  chosenperformances: [
  ],
  performanceId: null,
  loading: false,
  error: null,
}

export default function WishlistReducer(state = initialState, action) {
  switch (action.type) {

    case DELETE_FROM_WISHLIST: {
      let chosenperformances = state.chosenperformances;
      let index = chosenperformances.findIndex(item => item.performanceId == action.payload.performanceId);
      chosenperformances.splice(index, 1);
      return { ...state, chosenperformances }
    }

    case LOAD_WISHLIST_BEGIN:
    case STORE_PERFORMANCE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        chosenperformances: action.payload.performances,
      };
    case STORE_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        performanceId: { ...action.payload.performanceId }
      };

    case LOAD_WISHLIST_FAILURE:
    case STORE_PERFORMANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case ADD_TO_WISHLIST: {
        let chosenperformances = [...state.chosenperformances,
        {
            title: action.payload.item.title,
            mainImage: action.payload.item.mainImage,
            performanceId: action.payload.performanceId,
        }]
        return { ...state, chosenperformances }
    }

    

    default: {
      return state;
    }
  }
}
