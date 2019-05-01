const express = require("express");
const houseController = require("../server/controllers/houseController");


const router = express.Router();
router.route("/").get(houseController.getHouses);

module.exports = router;
