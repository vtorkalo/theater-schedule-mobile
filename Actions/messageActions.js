export const ENTER_MESSAGE_SUBJECT = "ENTER_MESSAGE_SUBJECT";
export const ENTER_MESSAGE_TEXT = "ENTER_MESSAGE_TEXT";

export const VALIDATE_MESSAGE_SUBJECT = "VALIDATE_MESSAGE_SUBJECT";
export const VALIDATE_MESSAGE_TEXT = "VALIDATE_MESSAGE_TEXT";

export const SEND_MESSAGE_BEGIN = "SEND_MESSAGE_BEGIN";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const enterMessageSubject = subject => ({
  type: ENTER_MESSAGE_SUBJECT,
  payload: { subject }
});

export const enterMessageText = text => ({
  type: ENTER_MESSAGE_TEXT,
  payload: { text }
});

export const validateMessageSubject = () => ({
  type: VALIDATE_MESSAGE_SUBJECT
});

export const validateMessageText = () => ({
  type: VALIDATE_MESSAGE_TEXT
});

export const sendMessageBegin = () => ({
  type: SEND_MESSAGE_BEGIN
});

export const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS
});

export const sendMessageFailure = error => ({
  type: SEND_MESSAGE_FAILURE,
  payload: { error }
});

export const sendMessage = message => {
  return (dispatch, getState) => {
    //dispatch(validateSubject());
    //dispatch(validateMessage());
    const { subjectError, textError } = getState().message;

    if (subjectError || textError) return;

    dispatch(sendMessageBegin());
    fetch("http://192.168.0.103:8900/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(() => {
        dispatch(sendMessageSuccess());
      })
      .catch(error => {
        dispatch(sendMessageFailure(error));
      });
  };
};
