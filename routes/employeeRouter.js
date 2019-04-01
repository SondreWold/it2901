import express from "express";
import * as employeeController from "../server/controllers/employeeController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(employeeController.getEmployees);
router.route("/latest/").get(employeeController.getLatestInsertedEmployee);
router.route("/:id").delete(employeeController.deleteEmployee);
router.route("/:name").get(employeeController.getEmployeesSearch);
router
  .route("/addEmployee/")
  .put(employeeController.insertNewEmployee)
  .get(employeeController.insertNewEmployee);
router.route("/date/:date").get(employeeController.getFreeTemp);
router.route("/work/date/:date").get(employeeController.getWorkingEmployees);

export default router;
