import {
  CHANGE_DATE,
  GET_MIN_DATE_BEGIN,
  GET_MIN_DATE_SUCCESS,
  GET_MIN_DATE_FAILURE
} from "./../actions/dateAction";

const initialState = {
  selectedDate: new Date(),
  minDate: "",
  loading: false,
  error: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      };
    }
    case GET_MIN_DATE_BEGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_MIN_DATE_SUCCESS: {
      return {
        ...state,
        minDate: action.payload.created_date,
        loading: false
      };
    }
    case GET_MIN_DATE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
    default:
      return state;
  }
}
