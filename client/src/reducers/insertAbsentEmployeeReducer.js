import {
  INSERT_ABSENT_EMPLOYEE_BEGIN,
  INSERT_ABSENT_EMPLOYEE_SUCCESS,
  INSERT_ABSENT_EMPLOYEE_FAILURE
} from "../actions/insertAbsentEmployeeAction";

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function insertAbsentEmployeeReducer(state = initialState, action) {
  switch (action.type) {
    case INSERT_ABSENT_EMPLOYEE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case INSERT_ABSENT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };

    case INSERT_ABSENT_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}