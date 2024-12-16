import express from "express";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import userValidations from "../validations/userValidations.js";
import { editProfile, getUserProfile } from "../controllers/User.js";
import protect from "../middlewares/Protect.js";
const router = express.Router();


router.put("/editProfile", protect, editProfile);
router.get("/user-profile", protect, getUserProfile);
export default router;
