import jwt from "jsonwebtoken";
import AppError from "./AppError.js";
const createJWT = async (user) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

export default createJWT;
