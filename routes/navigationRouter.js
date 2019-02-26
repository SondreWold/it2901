import express from "express";
import * as navigationController from "../server/controllers/navigationController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/").get(navigationController.getKindergartenName);
export default router;
