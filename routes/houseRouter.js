const express = require("express");
const houseController = require("../server/controllers/houseController");

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(houseController.getHouses);

module.exports = router;
