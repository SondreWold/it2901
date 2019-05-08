const express = require("express");
const movedController = require("../server/controllers/movedController");

const router = express.Router();
router.route("/:date").get(movedController.getMovedEmployee);
router.route("/").post(movedController.addMovedEmployee);
router
  .route("/:baseId/:employeeId/:date")
  .put(movedController.updateMovedEmployee);
router
  .route("/employeeId/:employeeId/date/:date")
  .delete(movedController.deleteMovedEmployee);

module.exports = router;
