import Settings from "../models/Settings.js";
import expressAsyncHandler from "express-async-handler";

export const setSettings = expressAsyncHandler(async (req, res) => {
  try {
    console.log("body", req.body);
    const { siteName, siteTheme, siteEmail, sitePhone, siteAddress } = req.body;
    const settings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      { siteName, siteTheme, siteEmail, sitePhone, siteAddress },
      { new: true }
    ).exec();
    if (!settings) {
      const newSettings = await Settings.create({
        siteName,
        siteTheme,
        siteEmail,
        sitePhone,
        siteAddress,
        user: req.user._id,
      });
      return res.status(200).json({ success: true, data: newSettings });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const getSettings = expressAsyncHandler(async (req, res) => {
  try {
    const settings = await Settings.find();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
