import { DELETE_EMPLOYEE } from "./../actions/deleteEmployeeAction";

//The name of the kindergarten
const initialState = {
  message: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_EMPLOYEE: {
      return {
        ...state,
        message: action.message
      };
    }
    default:
      return state;
  }
}
