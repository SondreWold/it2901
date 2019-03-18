import { UPDATE_SELECTED_EMPLOYEE } from "../../actions/EmployeeListActions/EmployeeListActions";
import { DELETE_EMPLOYEE } from "../../actions/deleteEmployeeAction";

const initialState = {
  selectedEmployee: "",
  message: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        message: action.message,
        selectedEmployee: ""
      };
    default:
      return state;
  }
}
