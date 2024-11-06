import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for access token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract token after "Bearer"
  }

  if (!token) {
    return next(new AppError("Not authorized, no token provided", 401));
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID encoded in the JWT
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("Not authorized, user not found", 401));
    }

    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    return next(new AppError("Not authorized, token failed", 401));
  }
});

export default protect;
