import {
    LOAD_EXCURSIONS_BEGIN,
    LOAD_EXCURSIONS_SUCCESS,
    LOAD_EXCURSIONS_FAILURE
  } from "../Actions/excursionActions";

  const initialState = {
    excursions: [],
    loading: false,
    error: null
  };


  export default function excursionReducer(state = initialState, action) {
    switch (action.type) {        
        case LOAD_EXCURSIONS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOAD_EXCURSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                excursions: action.payload.excursions,                
            };

        case LOAD_EXCURSIONS_FAILURE:
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
