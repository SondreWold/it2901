import {
  GET_ABSENCE_BEGIN,
  GET_ABSENCE_SUCCESS,
  GET_ABSENCE_FAILURE
} from "./../actions/contentActions/contentAbsenceEmployeeActions";

const initialState = {
  data: [],
  loading: false,
  error: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ABSENCE_BEGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ABSENCE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    }
    case GET_ABSENCE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
