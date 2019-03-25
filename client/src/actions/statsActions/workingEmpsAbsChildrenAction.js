export const GET_WORKING_EMPS_ABS_CHILDREN_BEGIN = "GET_WORKING_EMPS_ABS_CHILDREN_BEGIN";
export const GET_WORKING_EMPS_ABS_CHILDREN_SUCCESS = "GET_WORKING_EMPS_ABS_CHILDREN_SUCCESS";
export const GET_WORKING_EMPS_ABS_CHILDREN_FAILURE = "GET_WORKING_EMPS_ABS_CHILDREN_FAILURE";

export const getWorkingEmpsAbsChildrenBegin = () => ({
  type: GET_WORKING_EMPS_ABS_CHILDREN_BEGIN
});

export const getWorkingEmpsAbsChildrenSuccess = data => ({
  type: GET_WORKING_EMPS_ABS_CHILDREN_SUCCESS,
  payload: { data }
});

export const getWorkingEmpsAbsChildrenFailure = error => ({
  type: GET_WORKING_EMPS_ABS_CHILDREN_FAILURE,
  payload: { error }
});

export function getWorkingEmpsAbsChildren(date) {
  return dispatch => {
    dispatch(getWorkingEmpsAbsChildrenBegin());
    fetch("/api/stats/workingEmpsAbsChildren/" + date)
      .then(response => response.json())
      .then(data => dispatch(getWorkingEmpsAbsChildrenSuccess(data)))
      .catch(error => dispatch(getWorkingEmpsAbsChildrenFailure(error)));
  };
}
