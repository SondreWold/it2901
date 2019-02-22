import express from "express";
import * as baseController from "../server/controllers/baseController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(baseController.getBases);

export default router;
