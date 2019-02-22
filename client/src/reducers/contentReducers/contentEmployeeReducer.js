import {
  GET_EMPLOYEES_BEGIN,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE
} from "../../actions/contentActions/contentEmployeeActions";

const initialState = {
  employees: [],
  loading: false,
  error: null
};

export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_EMPLOYEES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        employees: action.payload.employees
      };

    case GET_EMPLOYEES_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.employees,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
