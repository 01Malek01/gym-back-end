import express from "express";
import protect from "../middlewares/Protect.js";
import restrictTo from "../middlewares/RestrictTo.js";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getSupplement,
  createSupplement,
  updateSupplement,
  deleteSupplement,
  getMembership,
  createMembership,
  updateMembership,
  deleteMembership,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} from "../controllers/Admin.js";
const router = express.Router();

router.use(protect);
router.use(restrictTo("admin"));
//manage users
router.get("/user", getUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//manage supplements
router.get("/supplement", getSupplement);
router.post("/supplement", createSupplement);
router.put("/supplement/:id", updateSupplement);
router.delete("/supplement/:id", deleteSupplement);

//manage memberships
router.get("/membership", getMembership);
router.post("/membership", createMembership);
router.put("/membership/:id", updateMembership);
router.delete("/membership/:id", deleteMembership);

//manage offers
router.get("/offer", getOffer);
router.post("/offer", createOffer);
router.put("/offer/:id", updateOffer);
router.delete("/offer/:id", deleteOffer);

//manage trainers
router.get("/trainer", getTrainer);
router.post("/trainer", createTrainer);
router.put("/trainer/:id", updateTrainer);
router.delete("/trainer/:id", deleteTrainer);

export default router;