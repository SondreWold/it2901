import {
  GET_BASES_BEGIN,
  GET_BASES_SUCCESS,
  GET_BASES_FAILURE
} from "../../actions/contentActions/contentBaseActions";

const initialState = {
  bases: [],
  loading: false,
  error: null
};

export default function contentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BASES_BEGIN:
      // mark the state as "loading" so we can use this to show a loading icon for example
      // also, reset any errors. we're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_BASES_SUCCESS:
      // all done: set loading "false".
      // also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        bases: action.payload.bases
      };

    case GET_BASES_FAILURE:
      // the request failed. It's done. So set loading to "false".
      // save the error, so we can display it somewhere.
      // since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}
