import express from "express";
import * as absenceController from "../server/controllers/absenceController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/employees").get(absenceController.getAbsentEmployees);
router.route("/children").get(absenceController.getAbsentChildren);

export default router;
