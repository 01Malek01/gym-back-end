import express from "express";
import validationsHandler from "../middlewares/ValidationsHandler.js";
import orderValidations from "../validations/orderValidations.js";
import protect from "../middlewares/Protect.js";
import restrictTo from "../middlewares/RestrictTo.js";
import {
  payOrder,
  getAllOrders,
  // paymentCallback,
} from "../controllers/Order.js";

const router = express.Router();

router.post("/pay", orderValidations, validationsHandler, protect, payOrder);
// router.post("payment-callback", paymentCallback);
router.get("/all-orders", protect, restrictTo("admin"), getAllOrders);

export default router;
