import BASE_URL from 'TheaterSchedule/baseURL';

export const SET_POLL_JSON = "SET_POLL_JSON";

export const DOWNLOAD_POLL_BEGIN = "DOWNLOAD_POLL_BEGIN";
export const DOWNLOAD_POLL_SUCCESS = "DOWNLOAD_POLL_SUCCESS";
export const DOWNLOAD_POLL_FAILURE = "DOWNLOAD_POLL_FAILURE";

export const SEND_POLL_BEGIN = "SEND_POLL_BEGIN";
export const SEND_POLL_SUCCESS = "SEND_POLL_SUCCESS";
export const SEND_POLL_FAILURE = "SEND_POLL_FAILURE";

export const sendPollBegin = () => ({
    type:SEND_POLL_BEGIN
})

export const sendPollSuccess = () => ({
    type:SEND_POLL_SUCCESS
})

export const sendPollFailure = () => ({
    type: SEND_POLL_FAILURE
})

export const downloadPollBegin = () => ({
    type: DOWNLOAD_POLL_BEGIN
})

export const downloadPollSuccess = () => ({
    type: DOWNLOAD_POLL_SUCCESS
})

export const downloadPollFailure = (error) => ({
    type: DOWNLOAD_POLL_FAILURE,
    payload: { error }
})

export const setPollJson = data => ({
    type : SET_POLL_JSON,
    payload : {data}
})

export const downloadPoll = () => {
    return (dispatch) => {
        dispatch(downloadPollBegin());
        return fetch(`${BASE_URL}CreateGoogleForm/GetDataFromGoogleForm`,{
            method:'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((result)=>{
                var res = JSON.parse(result);
                dispatch(setPollJson(res));
                dispatch(downloadPollSuccess());
            })
            .catch(error => {
                dispatch(downloadPollFailure(error));
            });
    };
};

export const sendPoll = (params) => {
    return (dispatch) => {
        dispatch(sendPollBegin());
        fetch(`${BASE_URL}CreateGoogleForm/SendDataToGoogleForm`,{
            method: 'POST',
            headers: { 
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: params
        })
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
        })
        .then(() => {
            dispatch(sendPollSuccess());
        })
        .catch(error => {
            dispatch(sendPollFailure(error));
        })
    }
}