import { getFreeTemps } from "./contentActions/contentEmployeeActions";
import { getWorkingEmployees } from "./contentActions/contentEmployeeActions";
export const GET_MOVED_EMPLOYEE_BEGIN = "GET_MOVED_EMPLOYEE_BEGIN";
export const GET_MOVED_EMPLOYEE_SUCCESS = "GET_MOVED_EMPLOYEE_SUCCESS";
export const GET_MOVED_EMPLOYEE_FAILURE = "GET_MOVED_EMPLOYEE_FAILURE";
export const UPDATE_MOVED_EMPLOYEE_BEGIN = "UPDATE_MOVED_EMPLOYEE_BEGIN";
export const UPDATE_MOVED_EMPLOYEE_SUCCESS = "UPDATE_MOVED_EMPLOYEE_SUCCESS";
export const UPDATE_SINGLE_WORKING_EMPLOYEE = "UPDATE_SINGLE_WORKING_EMPLOYEE";
export const REMOVE_WORKING_EMPLOYEE = "REMOVE_WORKING_EMPLOYEE";

export const updateSingleWorking = (employeeId, baseId, name) => ({
  type: UPDATE_SINGLE_WORKING_EMPLOYEE,
  payload: { employee_id: employeeId, base_id: baseId, first_name: name }
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

export function updateMovedEmployee(employeeId, baseId, date, name) {
  return dispatch => {
    if (name) {
      dispatch(updateSingleWorking(employeeId, baseId, name));
    }
    dispatch(updateMovedEmployeeBegin());
    fetch("api/moved/" + baseId + "/" + employeeId + "/" + date, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        dispatch(updateMovedEmployeeSuccess());
        dispatch(getWorkingEmployees(date));
      })
      .then(() => dispatch(getMovedEmployee(date)));
  };
}

export function addMovedEmployee(employeeId, baseId, date, name) {
  return dispatch => {
    if (name) {
      dispatch(updateSingleWorking(employeeId, baseId, name));
    }
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
      .catch(() => console.log("fail"));
  };
}

export function deleteMovedEmployee(employeeId, date) {
  return dispatch => {
    dispatch(removeWorkingEmployee(employeeId));
    fetch("api/moved/employeeId/" + employeeId + "/date/" + date, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        dispatch(getMovedEmployee(date));
        dispatch(getWorkingEmployees(date));
      })
      .catch(() => console.log("fail"));
  };
}

export function changeMovedEmployee(result, employees, moved_employees, date) {
  return dispatch => {
    const { destination, source, draggableId } = result;

    //Droppet utenfor baser
    if (!destination) {
      const emp = employees.find(
        employee => employee.id === draggableId && employee.position === 2
      );
      if (emp) {
        deleteMovedEmployee(emp.id, date);
      }
    }

    //Droppet nedover i samme base
    else if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      return;
    }

    //Droppet i annen base
    else {
      const name = employees.find(employee => employee.id === draggableId)
        .first_name;
      if (moved_employees.map(mov => mov.employee_id).includes(draggableId)) {
        dispatch(
          updateMovedEmployee(draggableId, destination.droppableId, date, name)
        );
      } else {
        dispatch(
          addMovedEmployee(draggableId, destination.droppableId, date, name)
        );
      }
    }
  };
}
