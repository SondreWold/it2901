export const UPDATE_DRAG_DATA = "UPDATE_DRAG_DATA";

export const updateDragData = data => ({
  type: UPDATE_DRAG_DATA,
  payload: data
});

export function formatAndUpdateData(moved_employees, bases, employees) {
  console.log(bases);
  let data = { employees: {}, columns: {}, columnOrder: [] };

  employees.forEach(e => {
    const id = "employee-" + e.id;
    data.employees[id] = { id: id, content: e.first_name };
  });
  bases.forEach(b => {
    const id = "column-" + b.id;
    data.columnOrder.push(id);
    data.columns[id] = { id: id, title: b.name, employeeIds: [] };
  });

  for (let i = 0; i < moved_employees.length; i++) {
    for (let j = 0; j < bases.length; j++) {
      if (moved_employees[i].base_id === bases[j].id) {
        data.columns["column-" + bases[j].id].employeeIds.push(
          "employee-" + moved_employees[i].employee_id
        );
      }
    }
  }

  return dispatch => {
    dispatch(updateDragData(data));
  };
}
