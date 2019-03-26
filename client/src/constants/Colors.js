const AlertColors = {
  success: "#27AE60"
};

const BaseColors = {
  ok: "#ffe200",
  good: "#37df11",
  bad: "#ff3b3b"
};

const paletteColors = {
  primary: "#207d92"
};

const EmployeeColors = {
  tempEmployee: "#b6e0e2",
  moveableEmployee: "#207d92",
  unMoveableEmployee: "#000033",
  selectedEmployee: "#E76F50",
  editEmployee: "grey"
};

const randomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default { EmployeeColors, BaseColors, paletteColors, randomColor };
