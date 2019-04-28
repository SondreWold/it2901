const express = require("express");
const unitController = require("../server/controllers/unitController");

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(unitController.getUnits);

module.exports = router;
