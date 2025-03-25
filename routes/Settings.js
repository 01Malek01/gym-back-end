import express from "express";
import { getSettings, setSettings } from "../controllers/Settings.js";
import restrictTo from "../middlewares/RestrictTo.js";
import protect from "../middlewares/Protect.js";

const router = express.Router();

router.get("/", getSettings);
router.post("/", protect, restrictTo("admin"), setSettings);
export default router;
