import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  siteName: {
    type: String,
    required: true,
    default: "Developers Gym",
  },
  siteTheme: String,
  siteEmail: String,
  sitePhone: String,
  siteAddress: String,
  siteLogo: String,
  siteCover: String,
});

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
