export const UPDATE_RATIO_BEGIN = "UPDATE_RATIO_BEGIN";
export const UPDATE_RATIO_SUCCESS = "UPDATE_RATIO_SUCCESS";
export const UPDATE_RATIO_FAILURE = "UPDATE_RATIO_FAILURE";
export const UPDATE_RATIO_EXISTING = "UPDATE_RATIO_EXISTING";

export const updateRatioBegin = () => ({
  type: UPDATE_RATIO_BEGIN
});

export const updateRatioSuccess = status => ({
  type: UPDATE_RATIO_SUCCESS,
  payload: { status }
});

export const updateRatioFailure = error => ({
  type: UPDATE_RATIO_FAILURE,
  payload: { error }
});

export const updateRatioExisting = status => ({
  type: UPDATE_RATIO_EXISTING,
  payload: { status }
});

export function updateRatio(date, baseId, ratio) {
  return dispatch => {
    dispatch(updateRatioBegin());
    fetch("/api/stats/updateRatio/" + date + "/" + baseId + "/" + ratio, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 202) {
          dispatch(updateRatioExisting("existing"));
        } else {
          dispatch(updateRatioSuccess("inserted"));
        }
      })
      .catch(error => dispatch(updateRatioFailure(error)));
  };
}
