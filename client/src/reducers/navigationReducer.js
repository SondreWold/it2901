import {
  GET_NAME_BEGIN,
  GET_NAME_SUCCESS,
  GET_NAME_FAILURE
} from "./../actions/navigationAction";

//The name of the kindergarten
const initialState = {
  name: "",
  loading: false,
  error: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NAME_BEGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_NAME_SUCCESS: {
      return {
        ...state,
        name: action.payload.name,
        loading: false
      };
    }
    case GET_NAME_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    }
    default:
      return state;
  }
}
