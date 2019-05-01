import { combineReducers } from "redux";
import contentBase from "./contentReducers/contentBaseReducer";
import contentEmployee from "./contentReducers/contentEmployeeReducer";
import contentAbsentEmployees from "./contentReducers/contentAbsenceEmployeeReducer";
import contentAbsentChildren from "./contentReducers/contentAbsenceChildrenReducer";
import movedEmployee from "./movedEmployeeReducer";
import date from "./dateReducer";
import pageNameHeader from "./navigationReducer";
import employeeList from "./EmployeeListReducers/EmployeeListReducer";
import insertAbsentEmployee from "./insertAbsentEmployeeReducer";
import workingEmployees from "./workingEmployeesReducer";
import absence from "./absenceReducer";

// stats
import workingEmpsAbsChildren from "./statsReducers/workingEmpsAbsChildrenReducer";
import absentEmpsPerMonth from "./statsReducers/absentEmpsPerMonthReducer";
import ratio from "./statsReducers/getRatioReducer";
import selectedDropdown from "./statsReducers/dropdownReducer";

// all reducers are combined below
// ./contentReducers/contentBaseReducer.js is well documented, and most reducers follow that pattern
export default combineReducers({
  contentBase,
  contentEmployee,
  contentAbsentEmployees,
  contentAbsentChildren,
  date,
  movedEmployee,
  pageNameHeader,
  employeeList,
  workingEmployees,
  insertAbsentEmployee,
  absentEmpsPerMonth,
  workingEmpsAbsChildren,
  ratio,
  selectedDropdown,
  absence
});
