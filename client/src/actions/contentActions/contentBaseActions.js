export const GET_BASES_BEGIN = "GET_BASES_BEGIN";
export const GET_BASES_SUCCESS = "GET_BASES_SUCCESS";
export const GET_BASES_FAILURE = "GET_BASES_FAILURE";

export const getBasesBegin = () => ({
  type: GET_BASES_BEGIN
});

export const getBasesSuccess = bases => ({
  type: GET_BASES_SUCCESS,
  payload: { bases }
});

export const getBasesFailure = error => ({
  type: GET_BASES_FAILURE,
  payload: { error }
});

export function getBases() {
  return dispatch => {
    dispatch(getBasesBegin());
    fetch("/api/base")
      .then(response => response.json())
      .then(bases => dispatch(getBasesSuccess(bases)))
      .catch(() => dispatch(getBasesFailure));
  };
}
