import { UPDATE_WORKING_EMPLOYEES } from "../actions/contentActions/contentEmployeeActions";

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

    default:
      return state;
  }
}
