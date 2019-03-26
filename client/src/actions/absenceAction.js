export const GET_ABSENCE_BEGIN = "GET_ABSENCE_BEGIN";
export const GET_ABSENCE_SUCCESS = "GET_ABSENCE_SUCCESS";
export const GET_ABSENCE_FAILURE = "GET_ABSENCE_FAILURE";

export const getAbsenceBegin = () => ({
  type: GET_ABSENCE_BEGIN
});

export const getAbsenceSuccess = absence => ({
  type: GET_ABSENCE_SUCCESS,
  payload: absence
});

export const getAbsenceFailure = error => ({
  type: GET_ABSENCE_FAILURE,
  payload: { error }
});

export function getAbsenceById(id) {
  return dispatch => {
    dispatch(getAbsenceBegin());
    fetch("/api/absence/" + id)
      .then(response => response.json())
      .then(data => dispatch(getAbsenceSuccess(data)))
      .catch(data => dispatch(getAbsenceFailure(data)));
  };
}
