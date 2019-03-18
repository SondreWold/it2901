import {
  INSERT_EMPLOYEE_BEGIN,
  INSERT_EMPLOYEE_SUCCESS,
  INSERT_EMPLOYEE_EXISTING,
  INSERT_EMPLOYEE_FAILURE
} from "../actions/insertEmployeeAction";

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function insertEmployeeReducer(state = initialState, action) {
  switch (action.type) {
    case INSERT_EMPLOYEE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case INSERT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload.status
      };

    case INSERT_EMPLOYEE_EXISTING:
      return {
        ...state,
        loading: false,
        status: action.payload.status
      };

    case INSERT_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
