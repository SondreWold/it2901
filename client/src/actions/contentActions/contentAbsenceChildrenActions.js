export const GET_ABSENCE_CHILDREN_BEGIN = "GET_ABSENCE_CHILDREN_BEGIN";
export const GET_ABSENCE_CHILDREN_SUCCESS = "GET_ABSENCE_CHILDREN_SUCCESS";
export const GET_ABSENCE_CHILDREN_FAILURE = "GET_ABSENCE_CHILDREN_FAILURE";

export const getAbsentChildrenBegin = () => ({
  type: GET_ABSENCE_CHILDREN_BEGIN
});

export const getAbsentChildrenSuccess = children => ({
  type: GET_ABSENCE_CHILDREN_SUCCESS,
  payload: { children }
});

export const getAbsentChildrenFailure = error => ({
  type: GET_ABSENCE_CHILDREN_FAILURE,
  payload: { error }
});

export function getAbsentChildren() {
  return dispatch => {
    dispatch(getAbsentChildrenBegin());
    fetch("/api/absence/children")
      .then(response => response.json())
      .then(children => dispatch(getAbsentChildrenSuccess(children)))
      .catch(() => dispatch(getAbsentChildrenFailure));
  };
}
