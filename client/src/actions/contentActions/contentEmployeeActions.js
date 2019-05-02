import {
  updateSelectedEmployee,
  getSelectedBase
} from "../EmployeeListActions/EmployeeListActions";
import { getAbsenceById } from "../contentActions/contentAbsenceEmployeeActions";

export const GET_EMPLOYEES_BEGIN = "GET_EMPLOYEES_BEGIN";
export const GET_EMPLOYEES_SUCCESS = "GET_EMPLOYEES_SUCCESS";
export const GET_EMPLOYEES_FAILURE = "GET_EMPLOYEES_FAILURE";
export const UPDATE_FREE_TEMPS = "GET_FREE_TEMPS";
export const UPDATE_WORKING_EMPLOYEES = "UPDATE_WORKING_EMPLOYEES";
export const GET_SEARCHED_EMPLOYEE_SUCCESS = "GET_SEARCHED_EMPLOYEE_SUCCESS";
export const UPDATE_WORKING_EMPLOYEES_ON_BASE =
  "UPDATE_WORKING_EMPLOYEES_ON_BASE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

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

export const deleteEmployee = message => ({
  type: DELETE_EMPLOYEE,
  message: message
});

export const updateFreeTemps = temps => ({
  type: UPDATE_FREE_TEMPS,
  payload: { temps }
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

export function insertNewEmployee(date, newEmployee) {
  return dispatch => {
    fetch("/api/employee/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: newEmployee.first_name,
        lastName: newEmployee.last_name,
        baseId: newEmployee.base_id,
        position: newEmployee.position,
        startDate: newEmployee.startDate
      })
    })
      .then(() => {
        fetch("/api/employee/latest")
          .then(res => res.json())
          .then(res => {
            newEmployee.id = res[0].max;
            dispatch(getSearchEmployees());
            dispatch(getSelectedBase(newEmployee.base_id));
            dispatch(getEmployees());
            dispatch(getFreeTemps(date));
            dispatch(updateSelectedEmployee(newEmployee));
            dispatch(getAbsenceById(newEmployee.id));
          });
      })
      .catch(error => console.log("Insertion of new employee failed " + error));
  };
}

export function editEmployee(id, updatedEmployee) {
  return dispatch => {
    fetch("/api/employee/id/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: updatedEmployee.first_name,
        lastName: updatedEmployee.last_name,
        baseId: updatedEmployee.base_id,
        position: updatedEmployee.position,
        startDate: updatedEmployee.startDate
      })
    })
      .then(() => {
        dispatch(getSearchEmployees());
        dispatch(getSelectedBase(updatedEmployee.base_id));
        dispatch(getEmployees());
        dispatch(updateSelectedEmployee(updatedEmployee));
        dispatch(getAbsenceById(updatedEmployee.id));
      })
      .catch(error => console.log("edit of  employee failed " + error));
  };
}

export function deleteEmployeeFromDb(id, employees=[]) {
	return dispatch => {
    fetch("api/employee/id/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(message => dispatch(deleteEmployee(message)))
      .then(() => {
        dispatch(getSearchEmployees());
        dispatch(getEmployees());
        if (employees.length != 0){
        	dispatch(updateSelectedEmployee(employees[0]));
        }
      });
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

export function getFreeTemps(date) {
  return dispatch => {
    fetch("/api/employee/date/" + date)
      .then(response => response.json())
      .then(temps => dispatch(updateFreeTemps(temps)))
      .catch(() => console.log("Failed retrieval of free temps"));
  };
}
