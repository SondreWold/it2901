import express from "express";
import * as dateController from "../server/controllers/dateController";

const router = express.Router();
router.route("/").get(dateController.getMinDate);
export default router;
