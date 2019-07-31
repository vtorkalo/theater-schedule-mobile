import {
  ENTER_MESSAGE_SUBJECT,
  ENTER_MESSAGE_TEXT,
  SEND_MESSAGE_BEGIN,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  VALIDATE_MESSAGE_SUBJECT,
  VALIDATE_MESSAGE_TEXT
} from "../Actions/messageActions";

const initialState = {
  subject: "",
  text: "",
  subjectError: "",
  textError: "",
  isSending: false,
  sendingError: null
};

export default function messageReducer(state = initialState, action) {
  let error;
  switch (action.type) {
    case ENTER_MESSAGE_SUBJECT:
      return { ...state, subject: action.payload.subject };

    case ENTER_MESSAGE_TEXT:
      return { ...state, text: action.payload.text };

    case VALIDATE_MESSAGE_SUBJECT: {
      error = state.subject.trim() === "" ? "Please enter a subject" : "";
      return { ...state, subjectError: error };
    }

    case VALIDATE_MESSAGE_TEXT: {
      error = state.text.trim() === "" ? "Please enter a message" : "";
      return { ...state, textError: error };
    }

    case SEND_MESSAGE_BEGIN:
      return { ...state, isSending: true, sendingError: null };

    case SEND_MESSAGE_SUCCESS:
      return { ...state, isSending: false, subject: "", text: "" };
       
    case SEND_MESSAGE_FAILURE:
      return { ...state, isSending: false, sendingError: action.payload.error };

    default:
      return state;
  }
}
