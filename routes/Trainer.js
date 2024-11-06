import express from "express";
import restrictTo from "../middlewares/RestrictTo.js";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import trainerValidations from "../validations/trainerValidations.js";
import protect from "../middlewares/Protect.js";
import {
  deleteTrainer,
  getAllTrainers,
  loginAsTrainer,
  signupAsTrainer,
} from "../controllers/Trainer.js";
const router = express.Router();

router.get("/allTrainers", getAllTrainers);
router.post("/signup", trainerValidations, ValidationsHandler, signupAsTrainer);
router.post("/login", loginAsTrainer);
router.delete("/:id", protect, restrictTo("admin"), deleteTrainer);

export default router;
