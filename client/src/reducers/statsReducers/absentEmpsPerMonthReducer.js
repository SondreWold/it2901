import {
  GET_ABSENT_EMPS_PER_MONTH_BEGIN,
  GET_ABSENT_EMPS_PER_MONTH_SUCCESS,
  GET_ABSENT_EMPS_PER_MONTH_FAILURE
} from "../../actions/statsActions/absentEmpsPerMonthAction";

const initialState = {
  data: [],
  loading: false,
  error: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ABSENT_EMPS_PER_MONTH_BEGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_ABSENT_EMPS_PER_MONTH_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        loading: false
      };
    }
    case GET_ABSENT_EMPS_PER_MONTH_FAILURE: {
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
