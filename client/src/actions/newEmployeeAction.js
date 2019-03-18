import { getEmployees } from "./contentActions/contentEmployeeActions";

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
  moveable,
  position
) {
  let moveableBit;
  if (moveable) {
    moveableBit = 1;
  }
  if (!moveable) {
    moveableBit = 0;
  }

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
        moveable: moveableBit,
        position: position
      })
    })
      .then(response => {
        dispatch(insertEmployeeSuccess("inserted"));
        dispatch(getEmployees());
      })
      .catch(() => console.log("whups"));
  };
}
