import {
  GET_MOVED_EMPLOYEE_BEGIN,
  GET_MOVED_EMPLOYEE_SUCCESS,
  GET_MOVED_EMPLOYEE_FAILURE,
  UPDATE_MOVED_EMPLOYEE_BEGIN,
  UPDATE_MOVED_EMPLOYEE_SUCCESS
} from "../actions/movedEmployeeAction";

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function movedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVED_EMPLOYEE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_MOVED_EMPLOYEE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_MOVED_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case UPDATE_MOVED_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case GET_MOVED_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
