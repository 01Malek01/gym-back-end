import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const editProfile = asyncHandler(async (req, res, next) => {
  const { username, email, phoneNumber, dateOfBirth } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new AppError("User not found");
  }
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("membershipType");
  if (user) {
    res.status(200).json({
      user,
    });
  } else {
    throw new AppError("You are not authenticated", 401);
  }
});
