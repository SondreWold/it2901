const express = require("express");
const employeeController = require("../server/controllers/employeeController");

const router = express.Router();
router.route("/").get(employeeController.getEmployees);
router.route("/id/:id").get(employeeController.getEmployee);
router.route("/").post(employeeController.insertNewEmployee);
router.route("/id/:id").put(employeeController.editEmployee);
router.route("/id/:id").delete(employeeController.deleteEmployee);

router.route("/latest/").get(employeeController.getLatestInsertedEmployee);
router.route("/:name").get(employeeController.getEmployeesSearch);
router.route("/date/:date").get(employeeController.getFreeTemp);
router.route("/work/date/:date").get(employeeController.getWorkingEmployees);

module.exports = router;
