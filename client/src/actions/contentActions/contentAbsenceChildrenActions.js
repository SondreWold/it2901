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

export function insertNewRowsForAbsentChildren(date) {
  return dispatch => {
    fetch("/api/absence/children/insert/date/" + date, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => dispatch(getAbsentChildrenAfterUpdate(date)));
  };
}

export function getAbsentChildrenAfterUpdate(date) {
  return dispatch => {
    dispatch(getAbsentChildrenBegin());
    fetch("/api/absence/children/date/" + date)
      .then(response => response.json())
      .then(children => dispatch(getAbsentChildrenSuccess(children)))
      .catch(() => dispatch(getAbsentChildrenFailure));
  };
}

export function getAbsentChildren(date) {
  return dispatch => {
    dispatch(getAbsentChildrenBegin());
    fetch("/api/absence/children/date/" + date)
      .then(response => response.json())
      .then(children =>
        children.length === 0
          ? dispatch(insertNewRowsForAbsentChildren(date))
          : dispatch(getAbsentChildrenSuccess(children))
      )
      .catch(() => dispatch(getAbsentChildrenFailure));
  };
}

export function updateAbsentChildren(amount, baseId, date) {
  return dispatch => {
    console.log(date);
    fetch("api/absence/children/baseid/" + baseId + "/date/" + date, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount
      })
    }).then(() => dispatch(getAbsentChildren(date)));
  };
}
