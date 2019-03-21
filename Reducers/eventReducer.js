import {
    LOAD_EVENTS_BEGIN,
    LOAD_EVENTS_SUCCESS,
    LOAD_EVENTS_FAILURE
  } from "../Actions/eventActions";

  const initialState = {
    events: [],
    loading: false,
    error: null
  };


  export default function eventReducer(state = initialState, action) {
    switch (action.type) {        
        case LOAD_EVENTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case LOAD_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload.events,                
            };

        case LOAD_EVENTS_FAILURE:
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
