export const GET_EMPLOYEES_BEGIN = "GET_EMPLOYEES_BEGIN";
export const GET_EMPLOYEES_SUCCESS = "GET_EMPLOYEES_SUCCESS";
export const GET_EMPLOYEES_FAILURE = "GET_EMPLOYEES_FAILURE";
export const UPDATE_FREE_TEMPS = "GET_FREE_TEMPS";
export const UPDATE_WORKING_EMPLOYEES = "UPDATE_WORKING_EMPLOYEES";
export const GET_SEARCHED_EMPLOYEE_SUCCESS = "GET_SEARCHED_EMPLOYEE_SUCCESS";
export const UPDATE_WORKING_EMPLOYEES_ON_BASE =
  "UPDATE_WORKING_EMPLOYEES_ON_BASE";

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

export const getSearchedEmployeeSuccess = data => ({
  type: GET_SEARCHED_EMPLOYEE_SUCCESS,
  payload: { data }
});

export function getEmployees() {
  let fetchString = "/api/employee/";
  return dispatch => {
    dispatch(getEmployeesBegin());
    fetch(fetchString)
      .then(response => response.json())
      .then(employees => dispatch(getEmployeesSuccess(employees)))
      .catch(() => dispatch(getEmployeesFailure));
  };
}

export function getSearchEmployees(name) {
  let fetchString = !name ? "/api/employee/" : "/api/employee/" + name;
  return dispatch => {
    dispatch(getEmployeesBegin());
    fetch(fetchString)
      .then(response => response.json())
      .then(employees => dispatch(getSearchedEmployeeSuccess(employees)))
      .catch(() => dispatch(getEmployeesFailure));
  };
}

export const updateFreeTemps = temps => ({
  type: UPDATE_FREE_TEMPS,
  payload: { temps }
});

export function getFreeTemps(date) {
  return dispatch => {
    fetch("/api/employee/date/" + date)
      .then(response => response.json())
      .then(temps => dispatch(updateFreeTemps(temps)))
      .catch(() => console.log("Failed retrieval of free temps"));
  };
}
