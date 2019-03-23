import { UPDATE_WORKING_EMPLOYEES } from "../actions/contentActions/contentEmployeeActions";
import {
  UPDATE_SINGLE_WORKING_EMPLOYEE,
  REMOVE_WORKING_EMPLOYEE
} from "../actions/movedEmployeeAction";
const initialState = {
  data: []
};

export default function movedReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_WORKING_EMPLOYEES:
      return {
        ...state,
        data: action.payload.data
      };
    case UPDATE_SINGLE_WORKING_EMPLOYEE:
      console.log(action.old);
      console.log(action.new);
      return {
        ...state,
        data: state.data
          .map(emp => {
            if (emp.employee_id === action.new.employee_id) {
              return action.new;
            } else if (
              action.old.base_id === action.new.base_id &&
              action.old.index !== action.new.index &&
              emp.base_id === action.new.base_id
            ) {
              if (
                emp.index > action.old.index &&
                emp.index <= action.new.index
              ) {
                emp.index--;
                return emp;
              } else if (
                emp.index < action.old.index &&
                emp.index >= action.new.index
              ) {
                emp.index++;
                return emp;
              } else {
                return emp;
              }
            } else if (action.old.base_id !== action.new.base_id) {
              if (
                emp.base_id === action.new.base_id &&
                emp.index >= action.new.index
              ) {
                emp.index++;
                return emp;
              } else if (
                emp.base_id === action.old.base_id &&
                emp.index > action.old.index
              ) {
                emp.index--;
                return emp;
              } else {
                return emp;
              }
            } else {
              return emp;
            }
          })
          .sort((a, b) => a.base_id - b.base_id || a.index - b.index)
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
