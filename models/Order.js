import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        itemType: {
          type: String,
          enum: ["supplement", "membership"],
        },
        itemPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        itemDescription: {
          type: String,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
