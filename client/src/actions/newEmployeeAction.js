export const NEW_EMPLOYEE = "NEW_EMPLOYEE";

//TODO: sjekk hvilke verdier som faktisk skal sendes med her
export const insertNewEmployee = (
  name,
  birthDate,
  position,
  startDate,
  movable
) => {
  fetch("/api/addEmployee", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      birthDate: birthDate,
      position: position,
      startDate: startDate,
      movable: movable
    })
  });
};
