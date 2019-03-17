import express from "express";
import * as employeeController from "../server/controllers/employeeController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(employeeController.getEmployees);
router.route("/:id").delete(employeeController.deleteEmployee);
router.route("/:name").get(employeeController.getEmployeesSearch);
router.route("/date/:date").get(employeeController.getFreeTemp);
router.route("/").post(employeeController.addTempToBase);

export default router;
