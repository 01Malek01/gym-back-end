import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String, // e.g., "Your membership will expire in 5 days."
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
