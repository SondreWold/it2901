const express = require("express");
const absenceController = require("../server/controllers/absenceController");

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
router.route("/:id").get(absenceController.getAbsenceForEmployee);

module.exports = router;
