import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    price: {
      type: Number,
    },
    durationInDays: {
      type: Number,
    },
  },
  { timestamps: true }
);

membershipSchema.post("save", function () {
  this.expirationDate = new Date(); //convert days to milliseconds
  Date.now() + this.durationInDays * 24 * 60 * 60 * 1000;
});
const Membership = mongoose.model("Membership", membershipSchema);

export default Membership;
