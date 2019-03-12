export const NEW_EMPLOYEE = "NEW_EMPLOYEE";

export const insertNewEmployee = (
  firstName,
  lastName,
  baseID,
  position,
  movable
) => {
  return dispatch => {
    console.log("inni en action");
    fetch("/api/addEmployee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        baseID: baseID,
        position: position,
        movable: movable
      })
    });
  };
};
