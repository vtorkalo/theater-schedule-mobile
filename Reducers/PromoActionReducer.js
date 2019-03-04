import {
    LOAD_PROMOACTIONS_BEGIN,
    LOAD_PROMOACTIONS_SUCCESS,
    LOAD_PROMOACTIONS_FAILURE,
  } from "../Actions/PromoActions";
  
  const initialState = {
    promoActions: [{description: 'React native ome love React native ome love React native ome love React native ome love React native ome love React native ome love'}],
    loading: false,
    error: null
  };
  
  
  export default function performanceReducer(state = initialState, action) {
    switch (action.type) {        
        case LOAD_PROMOACTIONS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOAD_PROMOACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                performance: action.payload.promoActions,                
            };

        case LOAD_PROMOACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        default:
            {
                return state;
            }
    }
}