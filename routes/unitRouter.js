const express = require("express");
const unitController = require("../server/controllers/unitController");

const router = express.Router();
router.route("/").get(unitController.getUnits);

module.exports = router;
