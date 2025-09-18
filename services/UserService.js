import User from "../models/User.js";
import AppError from "../utils/AppError.js";

class UserService {
  constructor(input, req, res) {
    this.input = input;
    this.req = req;
    this.res = res;
  }

  async getUserProfile() {
    const user = await User.findById(this.req.user._id).populate(
      "membershipType"
    );
    if (!user) {
      throw new AppError("You are not authenticated", 401);
    }
    return { user };
  }

  async editProfile() {
    const { username, email, phoneNumber, dateOfBirth } = this.input || {};
    const user = await User.findById(this.req.user._id);
    if (!user) {
      throw new AppError("User not found", 400);
    }

    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;

    const updatedUser = await user.save();
    return { user: updatedUser };
  }
}

export default UserService;
