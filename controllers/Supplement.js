import asyncHandler from "express-async-handler";
import Supplement from "../models/Supplement.js";
import AppError from "../utils/AppError.js";

// //create supplement
// export const createSupplement = asyncHandler(async (req, res, next) => {
//   const { name, description, price, stock } = req.body;
//   console.log("req image ", req.body.image);
//   console.log("req file", req.file);
//   if (!name || !description || !price || !stock) {
//     res.status(400);
//     throw new AppError("Please add all fields");
//   }
//   const supplement = await Supplement.create({
//     name,
//     description,
//     price,
//     stock,
//     image: image || "noimage.jpg",
//   });
//   res.status(201).json({
//     status: "success",
//     supplement,
//   });
// });

//get all supplements
export const getAllSupplements = asyncHandler(async (req, res, next) => {
  const supplements = await Supplement.find();
  res.status(200).json({
    status: "success",
    supplements,
  });
});

//delete supplement
export const deleteSupplement = asyncHandler(async (req, res, next) => {
  const supplementId = req.params.supplementId;
  const supplement = await Supplement.findById(supplementId);
  if (!supplement) {
    res.status(400);
    throw new AppError("Supplement not found");
  }
  await supplement.deleteOne();
  res.status(200).json({
    status: "success",
  });
});

//update supplement
export const updateSupplement = asyncHandler(async (req, res, next) => {
  const supplementId = req.params.supplementId;
  const supplement = await Supplement.findById(supplementId);
  if (!supplement) {
    res.status(400);
    throw new AppError("Supplement not found");
  }
  const { name, description, price, stock } = req.body;

  //check if any field is present

  if (name) supplement.name = name;
  if (description) supplement.description = description;
  if (price) supplement.price = price;
  if (stock) supplement.stock = stock;
  if (!name && !description && !price && !stock) {
    res.status(400);
    throw new AppError("Please add at least one field");
  }

  await supplement.save();
  res.status(200).json({
    status: "success",
    supplement,
  });
});
