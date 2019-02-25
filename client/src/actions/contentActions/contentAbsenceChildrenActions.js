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

export function getAbsentChildren(date) {
  return dispatch => {
    dispatch(getAbsentChildrenBegin());
    fetch("/api/absence/children/date/" + date)
      .then(response => response.json())
      .then(children => dispatch(getAbsentChildrenSuccess(children)))
      .catch(() => dispatch(getAbsentChildrenFailure));
  };
}

export function updateAbsentChildren(amount, baseId, date) {
  console.log("abc");
  console.log(amount);
  console.log(baseId);
  console.log(date);
  return dispatch => {
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
