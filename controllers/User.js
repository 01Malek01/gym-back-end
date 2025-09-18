import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import UserService from "../services/UserService.js";

export const editProfile = asyncHandler(async (req, res, next) => {
  const { username, email, phoneNumber, dateOfBirth } = req.body;
  const input = { username, email, phoneNumber, dateOfBirth };
  const userService = new UserService(input, req, res);
  const { user } = await userService.editProfile();
  res.status(200).json({ user });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const userService = new UserService(null, req, res);
  const { user } = await userService.getUserProfile();
  res.status(200).json({ user });
});
