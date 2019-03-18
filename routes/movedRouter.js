import express from "express";
import * as movedController from "../server/controllers/movedController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/:date").get(movedController.getMovedEmployee);
router.route("/").post(movedController.addMovedEmployee);
router
  .route("/:baseId/:employeeId/:date")
  .put(movedController.updateMovedEmployee);

export default router;
