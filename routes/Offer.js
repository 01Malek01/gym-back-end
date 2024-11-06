import express from "express";
import ValidationsHandler from "../middlewares/ValidationsHandler.js";
import offerValidations from "../validations/offerValidations.js";
import {
  createOffer,
  deleteOffer,
  getAllOffers,
  updateOffer,
} from "../controllers/Offer.js";
import protect from "../middlewares/Protect.js";
import restrictTo from "../middlewares/RestrictTo.js";
const router = express.Router();

router.get("/allOffers", getAllOffers);
router.post(
  "/create",
  protect,
  restrictTo("admin"),
  offerValidations,
  ValidationsHandler,
  createOffer
);
router.put("/:offerId/update", protect, restrictTo("admin"), updateOffer);
router.delete("/:offerId/delete", protect, restrictTo("admin"), deleteOffer);

export default router;
