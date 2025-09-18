import express from "express";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import {
  createTrainingLogValidation,
  updateTrainingLogValidation,
} from "../validations/trainingLogValidations.js";
import {
  createTrainingLog,
  getUserTrainingLogs,
  getTrainingLog,
  updateTrainingLog,
  deleteTrainingLog,
  getTrainingStats,
  getWorkoutProgress,
  getPersonalRecords,
  getWorkoutCategories,
  getRecentWorkouts,
  getWorkoutSummary,
} from "../controllers/TrainingLog.js";
import protect from "../middlewares/Protect.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// CRUD Operations
router.post(
  "/",
  createTrainingLogValidation,
  ValidationsHandler,
  createTrainingLog
);

router.get("/", getUserTrainingLogs);

router.get("/:id", getTrainingLog);

router.put(
  "/:id",
  updateTrainingLogValidation,
  ValidationsHandler,
  updateTrainingLog
);

router.delete("/:id", deleteTrainingLog);

// Analytics and Statistics
router.get("/stats/overview", getTrainingStats);

router.get("/stats/progress", getWorkoutProgress);

router.get("/stats/records", getPersonalRecords);

router.get("/stats/categories", getWorkoutCategories);

router.get("/stats/recent", getRecentWorkouts);

router.get("/stats/summary", getWorkoutSummary);

export default router;
