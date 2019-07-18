import {
    DOWNLOAD_POLL_BEGIN,
    DOWNLOAD_POLL_SUCCESS,
    DOWNLOAD_POLL_FAILURE,
    SET_POLL_JSON,
    SEND_POLL_BEGIN,
    SEND_POLL_FAILURE,
    SEND_POLL_SUCCESS
} from "../Actions/PollActions";

const initialState = {
    Data: {},
    survey:[],
    downloadError: null,
    isDownloading: false,
    sendError:null,
    isSending:null,
    isSend:false
}

export default function pollReducer(state = initialState, action){
    switch(action.type){
        case DOWNLOAD_POLL_BEGIN:
            return {...state, isDownloading:true, downloadError:null}
        case DOWNLOAD_POLL_FAILURE:
            return {...state, isDownloading:false, downloadError:action.payload.error}
        case DOWNLOAD_POLL_SUCCESS:
            return {...state, isDownloading:false}
        case SET_POLL_JSON:{
            return {...state, Data:action.payload.data}
        }
        case SEND_POLL_BEGIN:{
            return {...state, isSending:true, sendError:null}
        }
        case SEND_POLL_FAILURE: 
            return {...state, isSending:false, sendError:action.payload.error}
            
        case SEND_POLL_SUCCESS:
            return {...state, isSending:false, isSend:true}

        default:
            return state;
    }
}