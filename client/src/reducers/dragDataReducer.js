import { UPDATE_DRAG_DATA } from "./../actions/dragDataAction";

const initialState = {
  data: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DRAG_DATA: {
      return {
        ...state,
        data: action.payload
      };
    }
    /*    case UPDATE_DRAG_DATA_EMPLOYEES: {
      return {
        ...state,
        data: { employees: action.payload }
      };
    }
    case UPDATE_DRAG_DATA_COLUMNS: {
      return {
        ...state,
        data: { columns: action.payload }
      };
    }
    case UPDATE_DRAG_DATA_COLUMNORDER: {
      return {
        ...state,
        data: { columnOrder: action.payload }
      };
    }*/
    default:
      return state;
  }
}
