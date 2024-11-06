import Trainer from "../models/Trainer.js";
import AppError from "../utils/AppError.js";
import createJWT from "../utils/CreateJWT.js";
import sendCookie from "../utils/SendCookie.js";
import asyncHandler from "express-async-handler";
export const signupAsTrainer = asyncHandler(async (req, res, next) => {
  const {
    email,
    password,
    confirmPassword,
    name,
    gender,
    phoneNumber,
    experience,
    specialization,
  } = req.body;
  if (
    (!email || !password || !name,
    !confirmPassword,
    !gender,
    !phoneNumber,
    !experience,
    !specialization)
  ) {
    res.status(400);
    throw new AppError("Please add all fields");
  }
  const existingTrainer = await Trainer.findOne({ email });
  if (existingTrainer) {
    res.status(400);
    throw new AppError("Trainer already exists");
  }
  const newUser = await Trainer.create({
    email,
    password,
    name,
    phoneNumber,
    experience,
    specialization,
    confirmPassword,
    gender,
  });

  const token = await createJWT(newUser);
  await sendCookie(newUser, token, "jwt", res);
});

export const loginAsTrainer = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;
  if ((!email || !password, !name)) {
    res.status(400);
    throw new AppError("Please add all fields: email, password, name");
  }
  const existingTrainer = await Trainer.findOne({ email, name });
  if (!existingTrainer) {
    res.status(400);
    throw new AppError("Trainer not found");
  }
  const isPasswordCorrect = await existingTrainer.matchPassword(password);
  if (!isPasswordCorrect) {
    res.status(400);
    throw new AppError("Incorrect password");
  }
  const token = await createJWT(existingTrainer);
  await sendCookie(existingTrainer, token, "jwt", res);
});

export const deleteTrainer = asyncHandler(async (req, res, next) => {
  const trainerId = req.params.id;
  const trainer = await Trainer.findById(trainerId);
  if (!trainer) {
    res.status(400);
    throw new AppError("Trainer not found");
  }
  await trainer.remove();
  res.status(200).json({ status: "success" });
});

export const getAllTrainers = asyncHandler(async (req, res, next) => {
  const trainers = await Trainer.find().select("-password");
  res.status(200).json({ status: "success", trainers });
});
