import { getSearchEmployees } from "./contentActions/contentEmployeeActions";
import {
  getEmployees,
  getWorkingEmployees
} from "./contentActions/contentEmployeeActions";

export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

export const deleteEmployee = message => ({
  type: DELETE_EMPLOYEE,
  message: message
});

export function deleteEmployeeFromDb(id, date) {
  return dispatch => {
    fetch("api/employee/" + id, {
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
        dispatch(getWorkingEmployees(date));
      });
  };
}
