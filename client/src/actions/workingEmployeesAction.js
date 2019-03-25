export const UPDATE_WORKING_EMPLOYEES = "UPDATE_WORKING_EMPLOYEES";
export const UPDATE_WORKING_EMPLOYEES_ON_BASE =
  "UPDATE_WORKING_EMPLOYEES_ON_BASE";
export const REMOVE_WORKING_EMPLOYEE = "REMOVE_WORKING_EMPLOYEE";

export const updateWorkingEmployeesBase = (data, base) => ({
  type: UPDATE_WORKING_EMPLOYEES_ON_BASE,
  payload: data,
  base: base
});

export const updateWorkingEmployees = data => ({
  type: UPDATE_WORKING_EMPLOYEES,
  payload: data
});

export const removeWorkingEmployee = employeeId => ({
  type: REMOVE_WORKING_EMPLOYEE,
  payload: employeeId
});

export function getWorkingEmployees(date) {
  return dispatch => {
    fetch("/api/employee/work/date/" + date)
      .then(response => response.json())
      .then(employees => dispatch(updateWorkingEmployees(employees)))
      .catch(() => console.log("Failed retrieval of working employees"));
  };
}
