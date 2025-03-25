import Supplement from "../models/Supplement.js";
import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";
import uploadImage from "../utils/UploadImage.js";
// Controllers for managing users
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find().exec();
  res.status(200).json({ success: true, users });
});

export const createUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(201).json({ success: true, user });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).exec();
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res
    .status(200)
    .json({ success: true, data: `User with ID ${req.params.id} updated` });
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id).exec();
  res.status(200).json({ success: true, data: `User with ID ${id} deleted` });
});

// Controllers for managing supplements
export const getSupplements = expressAsyncHandler(async (req, res) => {
  const supplements = await Supplement.find().exec();
  res.status(200).send(supplements);
});

export const createSupplement = expressAsyncHandler(async (req, res) => {
  try {
    console.log("Received file:", req.file);
    console.log("Received body:", req.body);

    let imageUrl = "";

    if (req.file) {
      const result = await uploadImage(req.file.buffer);

      imageUrl = result.secure_url;
    }

    // Create the supplement entry in MongoDB
    const supplement = await Supplement.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: imageUrl,
    });

    res.status(201).json({ success: true, supplement });
  } catch (error) {
    console.error("Error creating supplement:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export const updateSupplement = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const supplement = await Supplement.findByIdAndUpdate(id, req.body, {
    new: true,
  }).exec();
  res
    .status(200)
    .json({ success: true, data: `Supplement with ID ${id} updated` });
});

export const deleteSupplement = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await Supplement.findByIdAndDelete(id).exec();
  res
    .status(200)
    .json({ success: true, data: `Supplement with ID ${id} deleted` });
});

// Controllers for managing memberships
export const getMembership = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: "Fetch all memberships" });
});

export const createMembership = expressAsyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: "Membership created" });
});

export const updateMembership = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, data: `Membership with ID ${id} updated` });
});

export const deleteMembership = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, data: `Membership with ID ${id} deleted` });
});

// Controllers for managing offers
export const getOffer = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: "Fetch all offers" });
});

export const createOffer = expressAsyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: "Offer created" });
});

export const updateOffer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ success: true, data: `Offer with ID ${id} updated` });
});

export const deleteOffer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ success: true, data: `Offer with ID ${id} deleted` });
});

// Controllers for managing trainers
export const getTrainer = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: "Fetch all trainers" });
});

export const createTrainer = expressAsyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: "Trainer created" });
});

export const updateTrainer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, data: `Trainer with ID ${id} updated` });
});

export const deleteTrainer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, data: `Trainer with ID ${id} deleted` });
});
