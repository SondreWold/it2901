import {
  getEmployees,
  getSearchEmployees,
  getFreeTemps,
} from "./contentActions/contentEmployeeActions";
import {
	updateSelectedEmployee,
  getSelectedBase
} from "./EmployeeListActions/EmployeeListActions";

import { getAbsenceById } from "./absenceAction";

export const INSERT_EMPLOYEE_BEGIN = "INSERT_EMPLOYEE_BEGIN";
export const INSERT_EMPLOYEE_SUCCESS = "INSERT_EMPLOYEE_SUCCESS";
export const INSERT_EMPLOYEE_EXISTING = "INSERT_EMPLOYEE_EXISTING";
export const INSERT_EMPLOYEE_FAILURE = "INSERT_EMPLOYEE_FAILURE";

export const insertEmployeeBegin = () => ({
  type: INSERT_EMPLOYEE_BEGIN
});

export const insertEmployeeSuccess = status => ({
  type: INSERT_EMPLOYEE_SUCCESS,
  payload: { status }
});

export const insertEmployeeExisting = status => ({
  type: INSERT_EMPLOYEE_EXISTING,
  payload: { status }
});

export const insertEmployeeFailure = error => ({
  type: INSERT_EMPLOYEE_FAILURE,
  payload: { error }
});

export function insertNewEmployee(
  date,
  updatedEmployee
) {
  return dispatch => {
    fetch("/api/employee/addEmployee/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: updatedEmployee.first_name,
        lastName: updatedEmployee.last_name,
        baseID: updatedEmployee.base_id,
        position: updatedEmployee.position,
        id: updatedEmployee.id
      })
    })
      .then(() => {
   			if (updatedEmployee.id !== null){
   				dispatch(getSearchEmployees());
	        dispatch(getSelectedBase(updatedEmployee.base_id));
	        dispatch(getEmployees());
	        dispatch(updateSelectedEmployee(updatedEmployee));
	        dispatch(getAbsenceById(updatedEmployee.id));
	        dispatch(insertEmployeeSuccess("updated"));
   			}
   			else {
	      	fetch("/api/employee/latest")
			      .then(res => res.json())
			      .then((res) => {
			      	updatedEmployee.id = res[0].max;
			        dispatch(getSearchEmployees());
			        dispatch(getSelectedBase(updatedEmployee.base_id));
			        dispatch(getEmployees());
			        dispatch(updateSelectedEmployee(updatedEmployee));
			        dispatch(getAbsenceById(updatedEmployee.id));
			        dispatch(insertEmployeeSuccess("inserted"));
	        })
      	}
      })
      .catch((error) => console.log("Insertion of new employee failed " + error));
  };
}
