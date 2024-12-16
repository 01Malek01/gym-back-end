import express from "express";
import { login, logout, refreshToken, signup } from "../controllers/Auth.js";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import userValidations from "../validations/userValidations.js";
import protect from "../middlewares/Protect.js";
const router = express.Router();

router.post("/signup", userValidations, ValidationsHandler, signup);
router.post("/login", userValidations, ValidationsHandler, login);
router.post("/logout", logout);

router.post("/refresh-token", refreshToken);
export default router;
