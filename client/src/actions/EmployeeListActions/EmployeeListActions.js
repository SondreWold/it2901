export const UPDATE_SELECTED_EMPLOYEE = "UPDATE_SELECTED_EMPLOYEE";
export const UPDATE_SELECTED_EMPLOYEE_LATEST_INSERT = "UPDATE_SELECTED_EMPLOYEE_LATEST_INSERT";
export const UPDATE_SELECTED_BASE = "UPDATE_SELECTED_BASE";
export const UPDATE_SELECTED_EDITED_EMPLOYEE = "UPDATE_SELECTED_EDITED_EMPLOYEE";

export const updateSelectedEmployee = employee => ({
  type: UPDATE_SELECTED_EMPLOYEE,
  payload: employee
});

export const updateSelectedBase = base => ({
  type: UPDATE_SELECTED_BASE,
  payload: base[0].name
});

export function getSelectedBase(id) {
  return dispatch => {
    fetch("api/base/" + id)
      .then(response => response.json())
      .then(data => {
        dispatch(updateSelectedBase(data));
      })
      .catch(() => console.log("error fetching base"));
  };
}

export const updateSelectedEmployeeLatestInsert = employee => ({
	type: UPDATE_SELECTED_EMPLOYEE_LATEST_INSERT,
	payload: employee
});