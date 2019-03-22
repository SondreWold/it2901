import express from "express";
import * as statsController from "../server/controllers/statsController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();

router
  .route("/absentEmpsPerMonth/:month")
  .get(statsController.getAbsentEmployeesPerMonth);

router
  .route("/workingEmpsAbsChildren/:date")
  .get(statsController.getWorkingEmpsAbsChildren);

export default router;