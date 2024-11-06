import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

trainerSchema.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified("password")) {
    return next();
  }
  // Validate password confirmation
  if (this.password !== this.confirmPassword) {
    throw new AppError("Passwords do not match");
  }
  // Hash password only if modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.confirmPassword = undefined; //remove confirmPassword from DB

  next();
});

//methods
trainerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Trainer = mongoose.model("Trainer", trainerSchema);
export default Trainer;
