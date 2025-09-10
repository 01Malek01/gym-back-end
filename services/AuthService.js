import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import createJWT from "../utils/CreateJWT.js";
import createRefreshToken from "../utils/CreateRefreshToken.js";
import jwt from "jsonwebtoken";
class AuthService {
  constructor(input, req, res) {
    this.input = input;
    this.req = req;
    this.res = res;
  }

  async signupUser() {
    const { email, password, username, confirmPassword, gender } = this.input;
    if ((!email || !password || !username, !confirmPassword, !gender)) {
      throw new AppError("Please add all fields");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exists");
    }
    const newUser = await User.create({
      email,
      password,
      username,
      confirmPassword,
      gender,
    });

    const accessToken = await createJWT(newUser);
    const refreshToken = await createRefreshToken(newUser);
    return { accessToken, refreshToken, newUser };
  }

  async loginUser() {
    const { email, password } = this.input;
    if (!email || !password) {
      throw new AppError("Please add all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Invalid credentials or user does not exist");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new AppError("Invalid credentials");
    }
    const accessToken = await createJWT(user);
    const refreshToken = await createRefreshToken(user);
    return { accessToken, refreshToken, user };
  }
  async logoutUser() {
    this.res.clearCookie("refreshToken");
    this.res.cookie("refreshToken", "loggedout", {
      httpOnly: true,
      expires: new Date(0), // set to past date
    });
  }
  async refreshToken() {
    const refreshToken = this.req.cookies.refreshToken;
    if (!refreshToken) {
      console.log("no refresh token");
      throw new AppError("Please login again");
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
      console.log(" invalid refresh token");
      throw new AppError("Please login again");
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log(" user not found");
      throw new AppError("Please login again");
    }
    const accessToken = await createJWT(user);
    return { accessToken };
  }
}

export default AuthService;
