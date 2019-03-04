export const CHANGE_DATE = "CHANGE_DATE";
export const GET_MIN_DATE_BEGIN = "GET_MIN_DATE_BEGIN";
export const GET_MIN_DATE_SUCCESS = "GET_MIN_DATE_SUCCESS";
export const GET_MIN_DATE_FAILURE = "GET_MIN_DATE_FAILURE";

export const changeDate = date => ({
  type: CHANGE_DATE,
  payload: date
});

export const getMinDateBegin = () => ({
  type: GET_MIN_DATE_BEGIN
});

export const getMinDateSuccess = created_date => ({
  type: GET_MIN_DATE_SUCCESS,
  payload: { created_date }
});

export const getMinDateFailure = error => ({
  type: GET_MIN_DATE_FAILURE,
  payload: { error }
});

export function getMinDate() {
  return dispatch => {
    dispatch(getMinDateBegin());
    fetch("/api/minDate")
      .then(response => response.json())
      .then(data => dispatch(getMinDateSuccess(data[0].created_date)))
      .catch(() => dispatch(getMinDateFailure));
  };
}
