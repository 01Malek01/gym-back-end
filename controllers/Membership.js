import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import MembershipService from "../services/MembershipService.js";
export const createMembership = asyncHandler(async (req, res, next) => {
  const membershipService = new MembershipService(req.body, req, res);
  const { membership } = await membershipService.createMembership();
  res.status(201).json({
    status: "success",
    membership,
  });
});

export const getAllMemberships = asyncHandler(async (req, res, next) => {
  const membershipService = new MembershipService(null, req, res);
  const { memberships } = await membershipService.getAllMemberships();
  res.status(200).json({
    status: "success",
    memberships,
  });
});
export const deleteMembership = asyncHandler(async (req, res, next) => {
  const membershipService = new MembershipService(null, req, res);
  await membershipService.deleteMembership();
  res.status(200).json({
    status: "success",
  });
});

export const updateMembership = asyncHandler(async (req, res, next) => {
  const membershipService = new MembershipService(req.body, req, res);
  const { membership } = await membershipService.updateMembership();
  res.status(200).json({
    status: "success",
    membership,
  });
});

export const getActiveMemberships = asyncHandler(async (req, res, next) => {
  const membershipService = new MembershipService(null, req, res);
  const { stats } = await membershipService.getActiveMemberships();
  return res.status(200).json({
    status: "success",
    stats,
  });
});
