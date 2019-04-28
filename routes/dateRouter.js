const express = require("express");
const dateController = require("../server/controllers/dateController");

const router = express.Router();
router.route("/").get(dateController.getMinDate);

module.exports = router;
