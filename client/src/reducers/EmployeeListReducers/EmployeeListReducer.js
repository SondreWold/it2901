import {
  UPDATE_SELECTED_EDITED_EMPLOYEE,
  UPDATE_SELECTED_EMPLOYEE,
  UPDATE_SELECTED_BASE
} from "../../actions/EmployeeListActions/EmployeeListActions";
import { DELETE_EMPLOYEE } from "../../actions/contentActions/contentEmployeeActions";

const initialState = {
  selectedEmployee: "",
  message: "",
  selectedBase: ""
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
    case UPDATE_SELECTED_BASE:
      return {
        ...state,
        selectedBase: action.payload
      };
    case UPDATE_SELECTED_EDITED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload
      };
    default:
      return state;
  }
}
