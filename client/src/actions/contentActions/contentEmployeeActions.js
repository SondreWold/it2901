import { getMovedEmployee } from "../movedEmployeeAction";

export const GET_EMPLOYEES_BEGIN = "GET_EMPLOYEES_BEGIN";
export const GET_EMPLOYEES_SUCCESS = "GET_EMPLOYEES_SUCCESS";
export const GET_EMPLOYEES_FAILURE = "GET_EMPLOYEES_FAILURE";
export const UPDATE_FREE_TEMPS = "GET_FREE_TEMPS";

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

export function getEmployees(name) {
  let fetchString = !name ? "/api/employee/" : "/api/employee/" + name;
  return dispatch => {
    dispatch(getEmployeesBegin());
    fetch(fetchString)
      .then(response => response.json())
      .then(employees => dispatch(getEmployeesSuccess(employees)))
      .catch(() => dispatch(getEmployeesFailure));
  };
}

export const updateFreeTemps = temps => ({
  type: UPDATE_FREE_TEMPS,
  payload: { temps }
});

export function getFreeTemps(date) {
  console.log("getfreetemps");
  return dispatch => {
    fetch("/api/employee/date/" + date)
      .then(response => response.json())
      .then(temps => dispatch(updateFreeTemps(temps)))
      .catch(() => console.log("fail"));
  };
}

export function addTempToBase(date, employeeId, baseId) {
  return dispatch => {
    fetch("api/employee/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        employeeId: employeeId,
        baseId: baseId
      })
    }).then(() => dispatch(getMovedEmployee(date)));
  };
}
