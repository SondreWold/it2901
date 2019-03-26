import {
  GET_RATIO_BEGIN,
  GET_RATIO_SUCCESS,
  GET_RATIO_FAILURE
} from "../../actions/statsActions/getRatioAction.js";

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RATIO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_RATIO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };

    case GET_RATIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}
