import mongoose from "mongoose";

const SupplementSchema = new mongoose.Schema(
  {
    name: String, // e.g., "Whey Protein"
    description: String, // short description of the product
    price: Number, // e.g., 20 (for $20)
    stock: Number, // e.g., number of items in stock
    image: String,
  },
  {
    timestamps: true,
  }
);

const Supplement = mongoose.model("Supplement", SupplementSchema);
export default Supplement;
