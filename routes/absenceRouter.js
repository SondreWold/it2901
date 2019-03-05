import express from "express";
import * as absenceController from "../server/controllers/absenceController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/employees").get(absenceController.getAbsentEmployees);
router.route("/children/date/:date").get(absenceController.getAbsentChildren);
router
  .route("/children/insert/date/:date")
  .post(absenceController.insertNewAbsentChildrenRow);
router
  .route("/children/baseid/:baseId/date/:date/")
  .put(absenceController.updateAbsentChildren);
router
  .route("/employees/:empId/date/:date/")
  .put(absenceController.insertAbsentEmployee);

export default router;
