import {
  GET_ABSENCE_EMPLOYEES_BEGIN,
  GET_ABSENCE_EMPLOYEES_SUCCESS,
  GET_ABSENCE_EMPLOYEES_FAILURE
} from "../../actions/contentActions/contentAbsenceEmployeeActions";

const initialState = {
  absentEmployees: [],
  loading: false,
  error: null
};

export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ABSENCE_EMPLOYEES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ABSENCE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        absentEmployees: action.payload.employees
      };

    case GET_ABSENCE_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.employees,
        absentEmployees: []
      };

    default:
      return state;
  }
}
