import { UPDATE_WORKING_EMPLOYEES } from "../actions/contentActions/contentEmployeeActions";
import { UPDATE_SINGLE_WORKING_EMPLOYEE } from "../actions/movedEmployeeAction";
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
      return {
        ...state,
        data: state.data.map(emp =>
          emp.employee_id === action.payload.employee_id ? action.payload : emp
        )
      };
    default:
      return state;
  }
}
