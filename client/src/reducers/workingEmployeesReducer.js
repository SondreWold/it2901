import update from "immutability-helper";

import {
  UPDATE_WORKING_EMPLOYEES,
  UPDATE_WORKING_EMPLOYEES_ON_BASE,
  REMOVE_WORKING_EMPLOYEE,
  ADD_WORKING_EMPLOYEES_BASE
} from "../actions/workingEmployeesAction";
const initialState = {
  data: null
};

export default function movedReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_WORKING_EMPLOYEES:
      return {
        ...state,
        data: action.payload
      };
    case UPDATE_WORKING_EMPLOYEES_ON_BASE:
      return update(state, {
        data: { [action.base]: { $set: action.payload } }
      });
    case ADD_WORKING_EMPLOYEES_BASE:
      return {
        ...state,
        data: { ...state.data, [action.payload]: [] }
      };
    case REMOVE_WORKING_EMPLOYEE:
      return {
        ...state,
        data: state.data.filter(emp => emp.employee_id !== action.payload)
      };
    default:
      return state;
  }
}
