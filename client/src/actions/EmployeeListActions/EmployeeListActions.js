export const UPDATE_SELECTED_EMPLOYEE = "UPDATE_SELECTED_EMPLOYEE";

export const updateSelectedEmployee = employee => ({
  type: UPDATE_SELECTED_EMPLOYEE,
  payload: employee
});
