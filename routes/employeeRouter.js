import express from "express";
import * as employeeController from "../server/employeeController";

// get an instance of express router
const router = express.Router();
router.route("/").get(employeeController.getEmployees);

export default router;
