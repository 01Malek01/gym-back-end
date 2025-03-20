import dotenv from "dotenv";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import AppError from "../utils/AppError.js";
import Order from "../models/Order.js";

export const getAllOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    orders,
  });
});

export const getUserOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    orders,
  });
});
