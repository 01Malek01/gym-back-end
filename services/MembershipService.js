import Membership from "../models/Membership.js";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";

class MembershipService {
  constructor(input, req, res) {
    this.input = input;
    this.req = req;
    this.res = res;
  }

  async createMembership() {
    const { type, price, durationInDays } = this.input || {};
    if (!type || !price || !durationInDays) {
      throw new AppError("Please add all fields", 400);
    }
    const membership = await Membership.create({ type, price, durationInDays });
    return { membership };
  }

  async getAllMemberships() {
    const memberships = await Membership.find();
    return { memberships };
  }

  async deleteMembership() {
    const { membershipId } = this.req.params;
    const membership = await Membership.findById(membershipId);
    if (!membership) {
      throw new AppError("Membership not found", 400);
    }
    await membership.remove();
    return { success: true };
  }

  async updateMembership() {
    const { membershipId } = this.req.params;
    const { type, price, durationInDays, expirationDate } = this.input || {};
    const membership = await Membership.findById(membershipId);
    if (!membership) {
      throw new AppError("Membership not found", 400);
    }
    membership.type = type;
    membership.price = price;
    membership.durationInDays = durationInDays;
    membership.expirationDate = expirationDate;
    await membership.save();
    return { membership };
  }

  async getActiveMemberships() {
    const stats = await User.aggregate([
      { $match: { membershipStatus: "active" } },
      { $group: { _id: "$membershipStatus", count: { $sum: 1 } } },
    ]);
    return { stats };
  }
}

export default MembershipService;
