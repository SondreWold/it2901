import {
  getEmployees,
  getSearchEmployees,
  getFreeTemps
} from "./contentActions/contentEmployeeActions";

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
  date
) {
  return dispatch => {
    fetch("/api/employee/addEmployee/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        baseID: baseID,
        position: position
      })
    })
      .then(response => {
        dispatch(insertEmployeeSuccess("inserted"));
        dispatch(getEmployees());
        dispatch(getSearchEmployees());
        dispatch(getFreeTemps(date));
      })
      .catch(() => console.log("Insertion of new employee failed"));
  };
}
