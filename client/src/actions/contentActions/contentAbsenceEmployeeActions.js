export const GET_ABSENCE_EMPLOYEES_BEGIN = "GET_ABSENCE_EMPLOYEES_BEGIN";
export const GET_ABSENCE_EMPLOYEES_SUCCESS = "GET_ABSENCE_EMPLOYEES_SUCCESS";
export const GET_ABSENCE_EMPLOYEES_FAILURE = "GET_ABSENCE_EMPLOYEES_FAILURE";

export const getAbsentEmployeesBegin = () => ({
  type: GET_ABSENCE_EMPLOYEES_BEGIN
});

export const getAbsentEmployeesSuccess = employees => ({
  type: GET_ABSENCE_EMPLOYEES_SUCCESS,
  payload: { employees }
});

export const getAbsentEmployeesFailure = error => ({
  type: GET_ABSENCE_EMPLOYEES_FAILURE,
  payload: { error }
});

export function getAbsentEmployees() {
  return dispatch => {
    dispatch(getAbsentEmployeesBegin());
    fetch("/api/absence/employees")
      .then(response => response.json())
      .then(employees => dispatch(getAbsentEmployeesSuccess(employees)))
      .catch(() => dispatch(getAbsentEmployeesFailure));
  };
}
