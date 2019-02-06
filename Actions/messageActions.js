export const ENTER_SUBJECT = "ENTER_SUBJECT";
export const ENTER_MESSAGE = "ENTER_MESSAGE";

export const VALIDATE_SUBJECT = "VALIDATE_SUBJECT";
export const VALIDATE_MESSAGE = "VALIDATE_MESSAGE";

export const SEND_MESSAGE_BEGIN = "SEND_MESSAGE_BEGIN";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const enterSubject = subject => ({
  type: ENTER_SUBJECT,
  payload: { subject }
});

export const enterMessage = message => ({
  type: ENTER_MESSAGE,
  payload: { message }
});

export const validateSubject = () => ({
  type: VALIDATE_SUBJECT
});

export const validateMessage = () => ({
  type: VALIDATE_MESSAGE
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
    const { subjectError, messageError } = getState().message;

    if (subjectError || messageError) return;

    dispatch(sendMessageBegin());
    fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
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
