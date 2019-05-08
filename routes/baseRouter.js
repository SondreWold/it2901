const express = require("express");
const baseController = require("../server/controllers/baseController");

const router = express.Router();
router.route("/").get(baseController.getBases);
router.route("/:id").get(baseController.getBaseById);

module.exports = router;
