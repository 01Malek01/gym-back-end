import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  title: String, // e.g., "20% off on Premium Membership"
  description: String, // detailed description of the offer
  startDate: String,
  endDate: String,
  createdAt: { type: Date, default: Date.now },
});

const Offer = mongoose.model("Offer", OfferSchema);
export default Offer;
