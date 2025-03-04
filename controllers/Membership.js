import Membership from "../models/Membership.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";
export const createMembership = asyncHandler(async (req, res, next) => {
  const { type, price, durationInDays } = req.body;
  if (!type || !price || !durationInDays) {
    res.status(400);
    throw new AppError("Please add all fields");
  }
  const membership = await Membership.create({
    type,
    price,
    durationInDays,
  });

  res.status(201).json({
    status: "success",
    membership,
  });
});

export const getAllMemberships = asyncHandler(async (req, res, next) => {
  const memberships = await Membership.find();
  res.status(200).json({
    status: "success",
    memberships,
  });
});
export const deleteMembership = asyncHandler(async (req, res, next) => {
  const { membershipId } = req.params;
  const membership = await Membership.findById(membershipId);
  if (!membership) {
    res.status(400);
    throw new AppError("Membership not found");
  }
  await membership.remove();
  res.status(200).json({
    status: "success",
  });
});

export const updateMembership = asyncHandler(async (req, res, next) => {
  const { membershipId } = req.params;
  const { type, price, durationInDays, expirationDate } = req.body;
  const membership = await Membership.findById(membershipId);
  if (!membership) {
    res.status(400);
    throw new AppError("Membership not found");
  }
  membership.type = type;
  membership.price = price;
  membership.durationInDays = durationInDays;
  membership.expirationDate = expirationDate;
  await membership.save();
  res.status(200).json({
    status: "success",
    membership,
  });
});

export const getActiveMemberships = asyncHandler(async (req, res, next) => {
  const stats = User.aggregate([
    {
      $match: { membershipStatus: "active" },
    },
    {
      $group: {
        _id: "$membershipStatus",
        count: { $sum: 1 },
      },
      activeMemberShips: {
        $sum: 1,
      },
    },
  ]);
  return res.status(200).json({
    status: "success",
    stats,
  });
});


