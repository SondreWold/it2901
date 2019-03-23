import { getFreeTemps } from "./contentActions/contentEmployeeActions";
import { getWorkingEmployees } from "./contentActions/contentEmployeeActions";
export const GET_MOVED_EMPLOYEE_BEGIN = "GET_MOVED_EMPLOYEE_BEGIN";
export const GET_MOVED_EMPLOYEE_SUCCESS = "GET_MOVED_EMPLOYEE_SUCCESS";
export const GET_MOVED_EMPLOYEE_FAILURE = "GET_MOVED_EMPLOYEE_FAILURE";
export const UPDATE_MOVED_EMPLOYEE_BEGIN = "UPDATE_MOVED_EMPLOYEE_BEGIN";
export const UPDATE_MOVED_EMPLOYEE_SUCCESS = "UPDATE_MOVED_EMPLOYEE_SUCCESS";
export const UPDATE_SINGLE_WORKING_EMPLOYEE = "UPDATE_SINGLE_WORKING_EMPLOYEE";
export const REMOVE_WORKING_EMPLOYEE = "REMOVE_WORKING_EMPLOYEE";

export const updateSingleWorkingEmployee = (
  working_employee_old,
  working_employee_new
) => ({
  type: UPDATE_SINGLE_WORKING_EMPLOYEE,
  old: working_employee_old,
  new: working_employee_new
});

export const removeWorkingEmployee = employeeId => ({
  type: REMOVE_WORKING_EMPLOYEE,
  payload: employeeId
});

export const getMovedEmployeeBegin = () => ({
  type: GET_MOVED_EMPLOYEE_BEGIN
});
export const updateMovedEmployeeBegin = () => ({
  type: UPDATE_MOVED_EMPLOYEE_BEGIN
});

export const updateMovedEmployeeSuccess = () => ({
  type: UPDATE_MOVED_EMPLOYEE_SUCCESS
});

// data = empId and baseId
export const getMovedEmployeeSuccess = data => ({
  type: GET_MOVED_EMPLOYEE_SUCCESS,
  payload: { data }
});

export const getMovedEmployeeFailure = error => ({
  type: GET_MOVED_EMPLOYEE_FAILURE,
  payload: { error }
});

export function getMovedEmployee(date) {
  return dispatch => {
    dispatch(getMovedEmployeeBegin());
    fetch("api/moved/" + date)
      .then(response => response.json())
      .then(data => {
        dispatch(getMovedEmployeeSuccess(data));
      })
      .catch(() => dispatch(getMovedEmployeeFailure));
  };
}

export function updateMovedEmployee(employeeId, baseId, date) {
  return dispatch => {
    dispatch(updateMovedEmployeeBegin());
    fetch("api/moved/" + baseId + "/" + employeeId + "/" + date, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        dispatch(updateMovedEmployeeSuccess());
        dispatch(getMovedEmployee(date));
      })
      .catch(() => {
        console.log("failed to update moved_employees");
        dispatch(getWorkingEmployees(date));
      });
  };
}

export function addMovedEmployee(employeeId, baseId, date) {
  return dispatch => {
    fetch("api/moved/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        employeeId: employeeId,
        baseId: baseId
      })
    })
      .then(() => {
        dispatch(getMovedEmployee(date));
        dispatch(getFreeTemps(date));
        dispatch(getWorkingEmployees(date));
      })
      .catch(() => {
        console.log("failed to add moved_employee");
      });
  };
}

export function deleteMovedEmployee(employeeId, date) {
  return dispatch => {
    fetch("api/moved/employeeId/" + employeeId + "/date/" + date, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        dispatch(getMovedEmployee(date));
      })
      .catch(() => {
        console.log("failed to delete moved_employees");
        dispatch(getWorkingEmployees(date));
      });
  };
}

export function changeMovedEmployee(
  result,
  working_employees,
  moved_employees,
  date
) {
  return dispatch => {
    const { destination, source, draggableId } = result;
    const working_employee = working_employees.find(
      employee => employee.employee_id === draggableId
    );

    //Droppet utenfor baser
    if (!destination) {
      if (working_employee.position === 2) {
        dispatch(removeWorkingEmployee(draggableId));
        dispatch(deleteMovedEmployee(working_employee.employee_id, date));
      }
    }

    //Droppet i annen base
    else {
      const working_employee_old = working_employees.find(
        mov => mov.employee_id === draggableId
      );
      const working_employee_new = JSON.parse(
        JSON.stringify(working_employee_old)
      );
      working_employee_new.base_id = destination.droppableId;
      working_employee_new.index = destination.index;

      if (moved_employees.map(mov => mov.employee_id).includes(draggableId)) {
        dispatch(
          updateMovedEmployee(draggableId, destination.droppableId, date)
        );
        dispatch(
          updateSingleWorkingEmployee(
            working_employee_old,
            working_employee_new
          )
        );
      } else {
        dispatch(addMovedEmployee(draggableId, destination.droppableId, date));
        dispatch(
          updateSingleWorkingEmployee(
            working_employee_old,
            working_employee_new
          )
        );
      }
    }
  };
}
