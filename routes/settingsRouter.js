import express from "express";
import * as settingsController from "../server/controllers/settingsController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();

router
	.route("/base/:id/:name/:total_children/:ratio")
	.put(settingsController.editBaseSettings);

export default router;