import update from "immutability-helper";

import {
  GET_ABSENCE_CHILDREN_BEGIN,
  GET_ABSENCE_CHILDREN_SUCCESS,
  GET_ABSENCE_CHILDREN_FAILURE,
  SET_ABSENCE_CHILDREN_ON_BASE
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
    case SET_ABSENCE_CHILDREN_ON_BASE:
      const index = state.absentChildren.findIndex(
        abs => abs.base_id === action.base
      );
      return update(state, {
        absentChildren: { [index]: { children: { $set: action.amount } } }
      });
    case GET_ABSENCE_CHILDREN_SUCCESS:
      return {
        ...state,
        loading: false,
        absentChildren: action.payload
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
