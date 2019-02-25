import {
  GET_ABSENCE_CHILDREN_BEGIN,
  GET_ABSENCE_CHILDREN_SUCCESS,
  GET_ABSENCE_CHILDREN_FAILURE
} from "../../actions/contentActions/contentAbsenceChildrenActions";

const initialState = {
  absentChildren: [],
  loading: false,
  error: null
};

export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ABSENCE_CHILDREN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ABSENCE_CHILDREN_SUCCESS:
      return {
        ...state,
        loading: false,
        absentChildren: action.payload.children
      };

    case GET_ABSENCE_CHILDREN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        absentChildren: []
      };

    default:
      return state;
  }
}
