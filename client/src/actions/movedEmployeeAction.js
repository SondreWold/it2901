import { getFreeTemps } from "./contentActions/contentEmployeeActions";
import { getWorkingEmployees } from "./contentActions/contentEmployeeActions";
export const GET_MOVED_EMPLOYEE_BEGIN = "GET_MOVED_EMPLOYEE_BEGIN";
export const GET_MOVED_EMPLOYEE_SUCCESS = "GET_MOVED_EMPLOYEE_SUCCESS";
export const GET_MOVED_EMPLOYEE_FAILURE = "GET_MOVED_EMPLOYEE_FAILURE";
export const UPDATE_MOVED_EMPLOYEE_BEGIN = "UPDATE_MOVED_EMPLOYEE_BEGIN";
export const UPDATE_MOVED_EMPLOYEE_SUCCESS = "UPDATE_MOVED_EMPLOYEE_SUCCESS";
export const UPDATE_SINGLE_WORKING_EMPLOYEE = "UPDATE_SINGLE_WORKING_EMPLOYEE";

export const updateSingleWorking = (employeeId, baseId) => ({
  type: UPDATE_SINGLE_WORKING_EMPLOYEE,
  payload: { employee_id: parseInt(employeeId), base_id: parseInt(baseId) }
});

export const getMovedEmployeeBegin = () => ({
  type: GET_MOVED_EMPLOYEE_BEGIN
});
export const updateMovedEmployeeBegin = () => ({
  type: UPDATE_MOVED_EMPLOYEE_BEGIN
});

export const updateMovedEmployeeSuccess = () => ({
  type: UPDATE_MOVED_EMPLOYEE_SUCCESS
});

// data = empId and baseId
export const getMovedEmployeeSuccess = data => ({
  type: GET_MOVED_EMPLOYEE_SUCCESS,
  payload: { data }
});

export const getMovedEmployeeFailure = error => ({
  type: GET_MOVED_EMPLOYEE_FAILURE,
  payload: { error }
});

export function getMovedEmployee(date) {
  return dispatch => {
    dispatch(getMovedEmployeeBegin());
    fetch("api/moved/" + date)
      .then(response => response.json())
      .then(data => {
        dispatch(getMovedEmployeeSuccess(data));
      })
      .catch(() => dispatch(getMovedEmployeeFailure));
  };
}

export function updateMovedEmployee(baseId, employeeId, date) {
  return dispatch => {
    dispatch(updateMovedEmployeeBegin());
    dispatch(updateSingleWorking(employeeId, baseId));
    fetch("api/moved/" + baseId + "/" + employeeId + "/" + date, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        dispatch(updateMovedEmployeeSuccess());
        dispatch(getWorkingEmployees(date));
      })
      .then(() => dispatch(getMovedEmployee(date)));
  };
}

export function addMovedEmployee(date, employeeId, baseId) {
  return dispatch => {
    dispatch(updateSingleWorking(employeeId, baseId));
    fetch("api/moved/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        employeeId: employeeId,
        baseId: baseId
      })
    })
      .then(() => {
        dispatch(getMovedEmployee(date));
        dispatch(getFreeTemps(date));
        dispatch(getWorkingEmployees(date));
      })
      .catch(() => console.log("fail"));
  };
}
