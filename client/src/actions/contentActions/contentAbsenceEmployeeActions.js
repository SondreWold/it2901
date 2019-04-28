export const GET_ABSENCE_EMPLOYEES_BEGIN = "GET_ABSENCE_EMPLOYEES_BEGIN";
export const GET_ABSENCE_EMPLOYEES_SUCCESS = "GET_ABSENCE_EMPLOYEES_SUCCESS";
export const GET_ABSENCE_EMPLOYEES_FAILURE = "GET_ABSENCE_EMPLOYEES_FAILURE";

export const GET_ABSENCE_BEGIN = "GET_ABSENCE_BEGIN";
export const GET_ABSENCE_SUCCESS = "GET_ABSENCE_SUCCESS";
export const GET_ABSENCE_FAILURE = "GET_ABSENCE_FAILURE";

export const INSERT_ABSENT_EMPLOYEE_BEGIN = "INSERT_ABSENT_EMPLOYEE_BEGIN";
export const INSERT_ABSENT_EMPLOYEE_SUCCESS = "INSERT_ABSENT_EMPLOYEE_SUCCESS";
export const INSERT_ABSENT_EMPLOYEE_EXISTING = "INSERT_ABSENT_EMPLOYEE_SUCCESS";
export const INSERT_ABSENT_EMPLOYEE_FAILURE = "INSERT_ABSENT_EMPLOYEE_FAILURE";

export const getAbsentEmployeesBegin = () => ({
  type: GET_ABSENCE_EMPLOYEES_BEGIN
});
export const getAbsentEmployeesSuccess = employees => ({
  type: GET_ABSENCE_EMPLOYEES_SUCCESS,
  payload: { employees }
});
export const getAbsentEmployeesFailure = error => ({
  type: GET_ABSENCE_EMPLOYEES_FAILURE,
  payload: { error }
});

export const getAbsenceBegin = () => ({
  type: GET_ABSENCE_BEGIN
});
export const getAbsenceSuccess = absence => ({
  type: GET_ABSENCE_SUCCESS,
  payload: absence
});
export const getAbsenceFailure = error => ({
  type: GET_ABSENCE_FAILURE,
  payload: { error }
});

export const insertAbsentEmployeeBegin = () => ({
  type: INSERT_ABSENT_EMPLOYEE_BEGIN
});
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

export function getAbsentEmployees() {
  return dispatch => {
    dispatch(getAbsentEmployeesBegin());
    fetch("/api/absence/employees")
      .then(response => response.json())
      .then(employees => dispatch(getAbsentEmployeesSuccess(employees)))
      .catch(() => dispatch(getAbsentEmployeesFailure));
  };
}

export function getAbsenceById(id) {
  return dispatch => {
    dispatch(getAbsenceBegin());
    fetch("/api/absence/" + id)
      .then(response => response.json())
      .then(data => dispatch(getAbsenceSuccess(data)))
      .catch(data => dispatch(getAbsenceFailure(data)));
  };
}

export function insertAbsentEmployee(empId, date) {
  return dispatch => {
    fetch("/api/absence/employees/" + empId + "/date/" + date, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 202) {
          dispatch(insertAbsentEmployeeExisting("existing"));
        } else {
          dispatch(insertAbsentEmployeeSuccess("inserted"));
          dispatch(getAbsenceById(empId));
        }
      })
      .catch(error => dispatch(insertAbsentEmployeeFailure(error)));
  };
}
