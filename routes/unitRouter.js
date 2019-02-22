import express from "express";
import * as unitController from "../server/controllers/unitController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(unitController.getUnits);

export default router;
