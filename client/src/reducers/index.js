import { combineReducers } from "redux";
import contentBase from "./contentReducers/contentBaseReducer";
import contentEmployee from "./contentReducers/contentEmployeeReducer";
import contentAbsentEmployees from "./contentReducers/contentAbsenceEmployeeReducer";
import contentAbsentChildren from "./contentReducers/contentAbsenceChildrenReducer";
import movedEmployee from "./movedEmployeeReducer";
import date from "./dateReducer";
import pageNameHeader from "./navigationReducer";
import dragData from "./dragDataReducer";
import employeeList from "./EmployeeListReducers/EmployeeListReducer";

export default combineReducers({
  //import in all reducers here
  contentBase,
  contentEmployee,
  contentAbsentEmployees,
  contentAbsentChildren,
  date,
  movedEmployee,
  pageNameHeader,
  dragData,
  employeeList
});
