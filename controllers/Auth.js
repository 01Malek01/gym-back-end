import asyncHandler from "express-async-handler";

import AuthService from "../services/AuthService.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { email, password, username, confirmPassword, gender } = req.body;
  const input = { email, password, username, confirmPassword, gender };
  const authService = new AuthService(input, req, res);
  const { accessToken, refreshToken, newUser } = await authService.signupUser();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 30, //30days
  });
  res.status(201).json({
    status: "success",
    accessToken,
    newUser: {
      _id: newUser._id,
      email: newUser.email,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const input = { email, password };
  const authService = new AuthService(input, req, res);
  const { accessToken, refreshToken, user } = await authService.loginUser();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 30, //30days
  });

  res.status(201).json({
    status: "success",
    accessToken,
    user: {
      _id: user._id,
      email: user.email,
    },
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const authService = new AuthService(null, req, res);
  await authService.logoutUser();
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const authService = new AuthService(null, req, res);
  const { accessToken } = await authService.refreshToken();
  res.status(200).json({ status: "success", accessToken });
});
