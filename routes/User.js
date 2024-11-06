import express from "express";
import { login, refreshToken, signup } from "../controllers/Auth.js";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import userValidations from "../validations/userValidations.js";
import { editProfile } from "../controllers/User.js";
import protect from "../middlewares/Protect.js";
const router = express.Router();

router.post("/signup", userValidations, ValidationsHandler, signup);
router.post("/login", userValidations, ValidationsHandler, login);

router.post("/refresh-token", refreshToken);
router.put("/editProfile", protect, editProfile);
export default router;
