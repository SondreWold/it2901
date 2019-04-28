const express = require("express");
const navigationController = require("../server/controllers/navigationController");

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(navigationController.getKindergartenName);

module.exports = router;
