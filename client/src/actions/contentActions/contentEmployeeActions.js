export const GET_EMPLOYEES_BEGIN = "GET_EMPLOYEES_BEGIN";
export const GET_EMPLOYEES_SUCCESS = "GET_EMPLOYEES_SUCCESS";
export const GET_EMPLOYEES_FAILURE = "GET_EMPLOYEES_FAILURE";

export const getEmployeesBegin = () => ({
  type: GET_EMPLOYEES_BEGIN
});

export const getEmployeesSuccess = employees => ({
  type: GET_EMPLOYEES_SUCCESS,
  payload: { employees }
});

export const getEmployeesFailure = error => ({
  type: GET_EMPLOYEES_FAILURE,
  payload: { error }
});

export function getEmployees() {
  return dispatch => {
    dispatch(getEmployeesBegin());
    fetch("/api/employee")
      .then(response => response.json())
      .then(employees => dispatch(getEmployeesSuccess(employees)))
      .catch(() => dispatch(getEmployeesFailure));
  };
}
