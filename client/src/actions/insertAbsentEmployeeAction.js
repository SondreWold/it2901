export const INSERT_ABSENT_EMPLOYEE_BEGIN = "INSERT_ABSENT_EMPLOYEE_BEGIN";
export const INSERT_ABSENT_EMPLOYEE_SUCCESS = "INSERT_ABSENT_EMPLOYEE_SUCCESS";
export const INSERT_ABSENT_EMPLOYEE_EXISTING = "INSERT_ABSENT_EMPLOYEE_SUCCESS";
export const INSERT_ABSENT_EMPLOYEE_FAILURE = "INSERT_ABSENT_EMPLOYEE_FAILURE";

export const insertAbsentEmployeeBegin = () => ({
  type: INSERT_ABSENT_EMPLOYEE_BEGIN
});

// data = empId and baseId
export const insertAbsentEmployeeSuccess = status => ({
  type: INSERT_ABSENT_EMPLOYEE_SUCCESS,
  payload: { status }
});

export const insertAbsentEmployeeExisting = status => ({
  type: INSERT_ABSENT_EMPLOYEE_EXISTING,
  payload: { status }
});

export const insertAbsentEmployeeFailure = error => ({
  type: INSERT_ABSENT_EMPLOYEE_FAILURE,
  payload: { error }
});

export function insertAbsentEmployee(empId, date) {
  return dispatch => {
    fetch("/api/absence/employees/" + empId + "/date/" + date, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
			.then((response) => {
				if (response.status === 202) {
					dispatch(insertAbsentEmployeeExisting("existing"))
				} else {
					dispatch(insertAbsentEmployeeSuccess("inserted"))
				}
			})
    	.catch((error) => dispatch(insertAbsentEmployeeFailure(error)));
  };
}
