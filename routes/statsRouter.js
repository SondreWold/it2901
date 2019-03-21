import express from "express";
import * as statsController from "../server/controllers/statsController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();

router.route("/absentEmpsPerMonth/:month").get(statsController.getAbsentEmployeesPerMonth);

/*
router.route("/").get(employeeController.getEmployees);
router.route("/:id").delete(employeeController.deleteEmployee);
router.route("/:name").get(employeeController.getEmployeesSearch);
router
  .route("/addEmployee/")
  .post(employeeController.insertNewEmployee)
  .get(employeeController.insertNewEmployee);
router.route("/date/:date").get(employeeController.getFreeTemp);
router.route("/work/date/:date").get(employeeController.getWorkingEmployees);
*/
export default router;
