import { UPDATE_DRAG_DATA } from "./../actions/dragDataAction";

const initialState = {
  data: { employees: {}, columns: {}, columnOrder: [] }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DRAG_DATA: {
      return {
        ...state,
        data: action.payload
      };
    }
    default:
      return state;
  }
}
