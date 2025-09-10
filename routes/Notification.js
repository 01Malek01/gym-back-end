import express from "express";
import protect from "../middlewares/Protect.js";
import { getMyNotifications, deleteAllNotifications } from "../controllers/Notification.js";

const router = express.Router();

// All routes are protected by the authentication middleware
router.use(protect);

// GET /api/v1/notification/my-notifications
router.get("/my-notifications", getMyNotifications);

// DELETE /api/v1/notification/delete-all
router.delete("/delete-all", deleteAllNotifications);

export default router;
