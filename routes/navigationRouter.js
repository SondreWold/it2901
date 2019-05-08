const express = require("express");
const navigationController = require("../server/controllers/navigationController");

const router = express.Router();
router.route("/").get(navigationController.getKindergartenName);

module.exports = router;
