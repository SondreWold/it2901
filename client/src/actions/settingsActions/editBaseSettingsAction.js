export const EDIT_BASE_SETTINGS_BEGIN = "EDIT_BASE_SETTINGS_BEGIN";
export const EDIT_BASE_SETTINGS_SUCCESS = "EDIT_BASE_SETTINGS_SUCCESS";
export const EDIT_BASE_SETTINGS_FAILURE = "EDIT_BASE_SETTINGS_FAILURE";
export const EDIT_BASE_SETTINGS_EXISTING = "EDIT_BASE_SETTINGS_EXISTING";

export const editBaseSettingsBegin = () => ({
  type: EDIT_BASE_SETTINGS_BEGIN
});

export const editBaseSettingsSuccess = status => ({
  type: EDIT_BASE_SETTINGS_SUCCESS,
  payload: { status }
});

export const editBaseSettingsFailure = error => ({
  type: EDIT_BASE_SETTINGS_FAILURE,
  payload: { error }
});

export const editBaseSettingsExisting = status => ({
  type: EDIT_BASE_SETTINGS_EXISTING,
  payload: { status }
});

export function editBaseSettings(id, name, total_children, ratio) {
  return dispatch => {
    dispatch(editBaseSettingsBegin());
    fetch("/api/settings/base/" + id + "/" + name + "/" + total_children + "/" + ratio, {
    	method: "PUT",
    	headers: {
    		"Content-Type": "application/json"
    	}
  	})
      .then(response => response.json())
      .then(response => {
	      if (response.status === 202) {
	        dispatch(editBaseSettingsExisting("existing"));
	      } else {
	        dispatch(editBaseSettingsSuccess("inserted"));
	      }
	    })
      .catch(error => dispatch(editBaseSettingsFailure(error)));
  };
}