import express from "express";
import { buyMembership } from "../controllers/Payment.js";
import protect from "../middlewares/Protect.js";
const router = express.Router();

router.post("/create-payment/membership/:membershipId", protect, buyMembership);

//the user can buy more than one supplement at a time so we need to change the route to accept an array of supplement ids
// router.post("/create-payment/supplement", protect, buySupplement);

export default router;
