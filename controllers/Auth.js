import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import createJWT from "../utils/CreateJWT.js";
import AppError from "../utils/AppError.js";
import createRefreshToken from "../utils/CreateRefreshToken.js";
export const signup = asyncHandler(async (req, res, next) => {
  const { email, password, username, confirmPassword, gender } = req.body;
  if ((!email || !password || !username, !confirmPassword, !gender)) {
    res.status(400);
    throw new AppError("Please add all fields");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new AppError("User already exists");
  }
  const newUser = await User.create({
    email,
    password,
    username,
    confirmPassword,
    gender,
  });

  const accessToken = await createJWT(newUser);
  const refreshToken = await createRefreshToken(newUser);
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
  if (!email || !password) {
    res.status(400).json({
      status: "fail",
      message: " Either email or password is incorrect ",
    });
    throw new AppError("Please add all fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new AppError("Invalid credentials or user does not exist");
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    res.status(400);
    throw new AppError("Invalid credentials");
  }
  const accessToken = await createJWT(user);
  const refreshToken = await createRefreshToken(user);
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
      role: user.role,
    },
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken");
  res.cookie("refreshToken", "loggedout", {
    httpOnly: true,
    expires: new Date(0), // set to past date
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401);
    console.log("no refresh token");
    throw new AppError("Please login again");
  }
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    res.status(401);
    console.log(" invalid refresh token");
    throw new AppError("Please login again");
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401);
    console.log(" user not found");
    
    throw new AppError("Please login again");
  }
  const accessToken = await createJWT(user);
  res.status(200).json({ status: "success", accessToken });
});
