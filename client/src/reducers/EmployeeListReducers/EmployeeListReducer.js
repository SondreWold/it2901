import { UPDATE_SELECTED_EMPLOYEE } from "../../actions/EmployeeListActions/EmployeeListActions";

const initialState = {
  selectedEmployee: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_EMPLOYEE: {
      return {
        ...state,
        selectedEmployee: action.payload
      };
    }
    default:
      return state;
  }
}
