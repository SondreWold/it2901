const BaseColors = {
  ok: { primary: "#ffe200", secondary: "#e8cd00" },
  good: { primary: "#37df11", secondary: "#29a70d" },
  bad: { primary: "#ff3b3b", secondary: "red" }
};

const paletteColors = {
  primary: "#207d92"
};

const EmployeeColors = {
  tempEmployee: "#b6e0e2",
  moveableEmployee: "#207d92",
  moveableEmployeeSecondary: "#f50057",
  unMoveableEmployee: "#000033",
  selectedEmployee: "#E76F50",
  editEmployee: "grey",
  borderColor: "#c6c6cc"
};

const NavbarColors = {
  navbar: "rgb(225, 225, 225)"
};

const statColors = ["#3385ff", "#ffff33", "#39ac73", "#ff5050"];

const randomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default {
  EmployeeColors,
  BaseColors,
  paletteColors,
  randomColor,
  NavbarColors,
  statColors
};
