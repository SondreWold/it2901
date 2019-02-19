import express from "express";
import * as houseController from "../server/controllers/houseController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(houseController.getHouses);

export default router;
