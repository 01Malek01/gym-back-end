import express from "express";
const router = express.Router();
import restrictTo from "../middlewares/RestrictTo.js";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import membershipValidations from "../validations/membershipValidations.js";
import {
  createMembership,
  deleteMembership,
  getActiveMemberships,
  getAllMemberships,
  updateMembership,
} from "../controllers/Membership.js";
import protect from "../middlewares/Protect.js";

router.get("/allMemberships", getAllMemberships);
router.post(
  "/create",
  protect,
  restrictTo("admin"),
  membershipValidations,
  ValidationsHandler,
  createMembership
);
router.delete(
  "/:membershipId/delete",
  protect,
  restrictTo("admin"),
  deleteMembership
);
router.put(
  "/:membershipId/update",
  protect,
  restrictTo("admin"),
  updateMembership
);
router.get(
  "/activeMemberships",
  protect,
  restrictTo("admin"),
  getActiveMemberships
);

export default router;
