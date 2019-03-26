import {
  UPDATE_RATIO_BEGIN,
  UPDATE_RATIO_SUCCESS,
  UPDATE_RATIO_EXISTING,
  UPDATE_RATIO_FAILURE
} from "../../actions/statsActions/updateRatioAction.js";

const initialState = {
  status: "",
  loading: false,
  error: null
};

export default function updateRatioReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_RATIO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_RATIO_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload.status
      };

    case UPDATE_RATIO_EXISTING:
      return {
        ...state,
        loading: false,
        status: action.payload.status
      };

    case UPDATE_RATIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
