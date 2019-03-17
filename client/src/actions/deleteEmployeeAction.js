import { getEmployees } from "./contentActions/contentEmployeeActions";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

export const deleteEmployee = message => ({
  type: DELETE_EMPLOYEE,
  message: message
});

export function deleteEmployeeFromDb(id) {
  console.log("ID: " + id);
  return dispatch => {
    fetch("api/employee/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(dispatch(deleteEmployee()))
      .then(dispatch(getEmployees()));
  };
}
