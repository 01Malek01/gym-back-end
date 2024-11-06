import express from "express";
import restrictTo from "../middlewares/RestrictTo.js";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import supplementValidations from "../validations/supplementValidations.js";
import {
  createSupplement,
  deleteSupplement,
  getAllSupplements,
  updateSupplement,
} from "../controllers/Supplement.js";
import protect from "../middlewares/Protect.js";
const router = express.Router();

router.get("/allSupplements", getAllSupplements);
router.post(
  "/create",
  protect,
  restrictTo("admin"),
  supplementValidations,
  ValidationsHandler,
  createSupplement
);
router.put(
  "/:supplementId/update",
  protect,
  restrictTo("admin"),
  updateSupplement
);
router.delete(
  "/:supplementId/delete",
  protect,
  restrictTo("admin"),
  deleteSupplement
);

export default router;
