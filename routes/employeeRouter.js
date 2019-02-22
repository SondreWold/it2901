import express from "express";
import * as employeeController from "../server/controllers/employeeController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(employeeController.getEmployees);

export default router;
