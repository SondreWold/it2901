import { getFreeTemps } from "./contentActions/contentEmployeeActions";
import { getWorkingEmployees } from "./workingEmployeesAction";
export const GET_MOVED_EMPLOYEE_BEGIN = "GET_MOVED_EMPLOYEE_BEGIN";
export const GET_MOVED_EMPLOYEE_SUCCESS = "GET_MOVED_EMPLOYEE_SUCCESS";
export const GET_MOVED_EMPLOYEE_FAILURE = "GET_MOVED_EMPLOYEE_FAILURE";
export const UPDATE_MOVED_EMPLOYEE_BEGIN = "UPDATE_MOVED_EMPLOYEE_BEGIN";
export const UPDATE_MOVED_EMPLOYEE_SUCCESS = "UPDATE_MOVED_EMPLOYEE_SUCCESS";

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

export function updateMovedEmployee(employeeId, baseId, date) {
  return dispatch => {
    dispatch(updateMovedEmployeeBegin());
    fetch("api/moved/" + baseId + "/" + employeeId + "/" + date, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        dispatch(updateMovedEmployeeSuccess());
        dispatch(getMovedEmployee(date));
      })
      .catch(() => {
        console.log("failed to update moved_employees");
        dispatch(getWorkingEmployees(date));
      });
  };
}

export function addMovedEmployee(employeeId, baseId, date, getWorking) {
  if (getWorking === undefined) {
    getWorking = true;
  }
  return dispatch => {
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
        if (getWorking) {
          dispatch(getWorkingEmployees(date));
        }
      })
      .catch(() => {
        console.log("failed to add moved_employee");
        dispatch(getWorkingEmployees(date));
      });
  };
}

export function deleteMovedEmployee(employeeId, date) {
  return dispatch => {
    fetch("api/moved/employeeId/" + employeeId + "/date/" + date, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        dispatch(getMovedEmployee(date));
        dispatch(getFreeTemps(date));
      })
      .catch(() => {
        console.log("failed to delete moved_employees");
        dispatch(getWorkingEmployees(date));
      });
  };
}
