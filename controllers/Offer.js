import Offer from "../models/Offer.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "express-async-handler";

//create offer
export const createOffer = asyncHandler(async (req, res, next) => {
  const { title, description, startDate, endDate } = req.body;
  if (!title || !description || !startDate || !endDate) {
    res.status(400);
    throw new AppError("Please add all fields");
  }
  const offer = await Offer.create({
    title,
    description,
    startDate,
    endDate,
  });
  res.status(201).json({
    status: "success",
    offer,
  });
});

//update offer
export const updateOffer = asyncHandler(async (req, res, next) => {
  const offerId = req.params.offerId;
  const offer = await Offer.findById(offerId);
  if (!offer) {
    res.status(400);
    throw new AppError("Offer not found");
  }
  const { title, description, startDate, endDate } = req.body;
  if (title) offer.title = title;
  if (description) offer.description = description;
  if (startDate) offer.startDate = startDate;
  if (endDate) offer.endDate = endDate;
  if (!title && !description && !startDate && !endDate) {
    res.status(400);
    throw new AppError("Please add at least one field");
  }
  await offer.save();
  res.status(200).json({
    status: "success",
    offer,
  });
});

//delete offer
export const deleteOffer = asyncHandler(async (req, res, next) => {
  const offerId = req.params.offerId;
  const offer = await Offer.findById(offerId);
  if (!offer) {
    res.status(400);
    throw new AppError("Offer not found");
  }
  await offer.deleteOne();
  res.status(200).json({
    status: "success",
  });
});

//get all offers
export const getAllOffers = asyncHandler(async (req, res, next) => {
  const offers = await Offer.find();
  res.status(200).json({
    status: "success",
    offers,
  });
});
