import {
  ENTER_SUBJECT,
  ENTER_MESSAGE,
  SEND_MESSAGE_BEGIN,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  VALIDATE_SUBJECT,
  VALIDATE_MESSAGE
} from "../Actions/messageActions";

const initialState = {
  subject: "",
  message: "",
  subjectError: "",
  messageError: "",
  isSending: false,
  sendingError: null
};

export default function settingsReducer(state = initialState, action) {
  let error;
  switch (action.type) {
    case ENTER_SUBJECT:
      return { ...state, subject: action.payload.subject };

    case ENTER_MESSAGE:
      return { ...state, message: action.payload.message };

    case VALIDATE_SUBJECT: {
      error = state.subject === "" ? "Please enter a subject" : "";
      return { ...state, subjectError: error };
    }

    case VALIDATE_MESSAGE: {
      error = state.message === "" ? "Please enter a message" : "";
      return { ...state, messageError: error };
    }

    case SEND_MESSAGE_BEGIN:
      return { ...state, isSending: true, sendingError: null };

    case SEND_MESSAGE_SUCCESS:
      return { ...state, isSending: false, subject: "", message: "" };

    case SEND_MESSAGE_FAILURE:
      return { ...state, isSending: false, sendingError: action.payload.error };

    default:
      return state;
  }
}
