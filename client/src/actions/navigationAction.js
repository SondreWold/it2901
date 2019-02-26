export const GET_NAME_BEGIN = "GET_NAME_BEGIN";
export const GET_NAME_SUCCESS = "GET_NAME_SUCCESS";
export const GET_NAME_FAILURE = "GET_NAME_FAILURE";

export const getNameBegin = () => ({
  type: GET_NAME_BEGIN
});

export const getNameSuccess = name => ({
  type: GET_NAME_SUCCESS,
  payload: { name }
});

export const getNameFailure = error => ({
  type: GET_NAME_FAILURE,
  payload: { error }
});

export function getName() {
  return dispatch => {
    dispatch(getNameBegin());
    fetch("/api/navigation")
      .then(response => response.json())
      .then(data => dispatch(getNameSuccess(data[0].name)))
      .catch(() => dispatch(getNameFailure));
  };
}
