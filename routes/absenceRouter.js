import express from "express";
import * as absenceController from "../server/controllers/absenceController";

// get an instance of express router, then redirect to correct controller
const router = express.Router();
router.route("/employees").get(absenceController.getAbsentChildren);
router.route("/children").get(absenceController.getAbsentEmployees);

export default router;
