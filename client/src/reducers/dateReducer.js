import { CHANGE_DATE } from "./../actions/dateAction";

const initialState = {
  selectedDate: new Date()
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      };
    }
    default:
      return state;
  }
}
