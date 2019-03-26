import {
  GET_WORKING_EMPS_ABS_CHILDREN_BEGIN,
  GET_WORKING_EMPS_ABS_CHILDREN_SUCCESS,
  GET_WORKING_EMPS_ABS_CHILDREN_FAILURE
} from "../../actions/statsActions/workingEmpsAbsChildrenAction";

const initialState = {
  data: [],
  loading: false,
  error: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKING_EMPS_ABS_CHILDREN_BEGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_WORKING_EMPS_ABS_CHILDREN_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        loading: false
      };
    }
    case GET_WORKING_EMPS_ABS_CHILDREN_FAILURE: {
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
