export const UPDATE_SELECTED_EMPLOYEE = "UPDATE_SELECTED_EMPLOYEE";
export const UPDATE_SELECTED_BASE = "UPDATE_SELECTED_BASE";
export const UPDATE_SELECTED_EDITED_EMPLOYEE = "UPDATE_SELECTED_EDITED_EMPLOYEE";

//export const updateSelectedEditedEmployee

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

/*
export function updateProduct(product) {
  return (dispatch, getState) => {
    const { accountDetails } = getState();

    dispatch({
      type: UPDATE_PRODUCT,
      stateOfResidenceId: accountDetails.stateOfResidenceId,
      product,
    });
  };
}
*/
