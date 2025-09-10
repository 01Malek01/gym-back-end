import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    membershipStatus: {
      type: String,
      enum: ["active", "expired", "pending"],
      default: "pending",
    },
    membershipType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
    },
    fitnessTracker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FitnessTracker",
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    notifications: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profilePicture: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    membershipExpirationDate: {
      type: Date,
      index: true, // Add index for faster queries
    },
    expiryNotificationSent: {
      type: Boolean,
      default: false,
    },
    lastMembershipNotification: {
      type: Date,
    },
    membershipHistory: [{
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      membershipType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership',
        required: true,
      },
      status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
      },
    }],
  },
  { timestamps: true }
);

//middleware
userSchema.pre("save", async function (next) {
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
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
