import express from "express";
import validationsHandler from "../middlewares/ValidationsHandler.js";
import orderValidations from "../validations/orderValidations.js";
import protect from "../middlewares/Protect.js";
import restrictTo from "../middlewares/RestrictTo.js";
import {
  getAllOrders,
  getUserOrders,
  // paymentCallback,
} from "../controllers/Order.js";

const router = express.Router();

router.get("/all-orders", protect, restrictTo("admin"), getAllOrders);
router.get("/user-orders", protect, getUserOrders);
export default router;
