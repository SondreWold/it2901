const express = require("express");
const statsController = require("../server/controllers/statsController");

const router = express.Router();

router
  .route("/absentEmpsPerMonth/:month")
  .get(statsController.getAbsentEmployeesPerMonth);

router
  .route("/workingEmpsAbsChildren/:date")
  .get(statsController.getWorkingEmpsAbsChildren);

router.route("/getRatio/:fromDate/:toDate").get(statsController.getRatio);

router
  .route("/updateRatio/:date/:baseId/:ratio")
  .put(statsController.updateRatio);

module.exports = router;
