import {
  getEmployees,
  getSearchEmployees,
  getFreeTemps,
  getWorkingEmployees
} from "./contentActions/contentEmployeeActions";
import {updateSelectedEmployee} from "./EmployeeListActions/EmployeeListActions";

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
  firstName,
  lastName,
  baseID,
  position,
  date,
  empId,
  employee
) {
  return dispatch => {
    fetch("/api/employee/addEmployee/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        baseID: baseID,
        position: position,
        id: empId
      })
    })
      .then(() => {
        dispatch(insertEmployeeSuccess("inserted"));
        dispatch(getEmployees());
        dispatch(getSearchEmployees());
        dispatch(getFreeTemps(date));
        dispatch(getWorkingEmployees(date));
        dispatch(updateSelectedEmployee(employee));
        console.log("Excecuted");
      })
      .catch((error) => console.log("Insertion of new employee failed " + error));
  };
}
