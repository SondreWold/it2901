export const GET_RATIO_BEGIN = "GET_RATIO_BEGIN";
export const GET_RATIO_SUCCESS = "GET_RATIO_SUCCESS";
export const GET_RATIO_FAILURE = "GET_RATIO_FAILURE";

export const getRatioBegin = () => ({
  type: GET_RATIO_BEGIN
});

export const getRatioSuccess = data => ({
  type: GET_RATIO_SUCCESS,
  payload: { data }
});

export const getRatioFailure = error => ({
  type: GET_RATIO_FAILURE,
  payload: { error }
});

// expected input is strings in YYYY-MM-DD format
export function getRatio(fromDate, toDate) {
  return dispatch => {
    dispatch(getRatioBegin());
    fetch("/api/stats/getRatio/" + fromDate + "/" + toDate)
      .then(response => response.json())
      .then(data => dispatch(getRatioSuccess(data)))
      .catch(error => dispatch(getRatioFailure(error)));
  };
}
