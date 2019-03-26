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

// stats
import workingEmpsAbsChildren from "./statsReducers/workingEmpsAbsChildrenReducer";
import absentEmpsPerMonth from "./statsReducers/absentEmpsPerMonthReducer";
import ratio from "./statsReducers/getRatioReducer";

export default combineReducers({
  //import in all reducers here
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
  ratio
});