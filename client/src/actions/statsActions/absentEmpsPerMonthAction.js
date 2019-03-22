export const GET_ABSENT_EMPS_PER_MONTH_BEGIN = "GET_ABSENT_EMPS_PER_MONTH_BEGIN";
export const GET_ABSENT_EMPS_PER_MONTH_SUCCESS = "GET_ABSENT_EMPS_PER_MONTH_SUCCESS";
export const GET_ABSENT_EMPS_PER_MONTH_FAILURE = "GET_ABSENT_EMPS_PER_MONTH_FAILURE";

export const getAbsentEmpsPerMonthBegin = () => ({
  type: GET_ABSENT_EMPS_PER_MONTH_BEGIN
});

export const getAbsentEmpsPerMonthSuccess = data => ({
  type: GET_ABSENT_EMPS_PER_MONTH_SUCCESS,
  payload: { data }
});

export const getAbsentEmpsPerMonthFailure = error => ({
  type: GET_ABSENT_EMPS_PER_MONTH_FAILURE,
  payload: { error }
});

// month is an int ranging from 1-12
export function getAbsentEmpsPerMonth(month) {
  return dispatch => {
    dispatch(getAbsentEmpsPerMonthBegin());
    fetch("/api/stats/absentEmpsPerMonth/" + month)
      .then(response => response.json())
      .then(data => dispatch(getAbsentEmpsPerMonthSuccess(data)))
      .catch(error => dispatch(getAbsentEmpsPerMonthFailure(error)));
  };
}
