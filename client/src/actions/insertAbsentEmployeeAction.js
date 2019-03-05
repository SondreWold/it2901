export const INSERT_ABSENT_EMPLOYEE_BEGIN = "INSERT_ABSENT_EMPLOYEE_BEGIN";
export const INSERT_ABSENT_EMPLOYEE_SUCCESS = "INSERT_ABSENT_EMPLOYEE_SUCCESS";
export const INSERT_ABSENT_EMPLOYEE_FAILURE = "INSERT_ABSENT_EMPLOYEE_FAILURE";

export const insertAbsentEmployeeBegin = () => ({
  type: INSERT_ABSENT_EMPLOYEE_BEGIN
});

// data = empId and baseId
export const insertAbsentEmployeeSuccess = data => ({
  type: INSERT_ABSENT_EMPLOYEE_SUCCESS,
  payload: { data }
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
    }).catch((error) => dispatch(insertAbsentEmployeeFailure(error)));
  };
}
