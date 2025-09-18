import User from "../models/User.js";
import Supplement from "../models/Supplement.js";
import uploadImage from "../utils/UploadImage.js";

class AdminService {
  constructor(input, req, res) {
    this.input = input;
    this.req = req;
    this.res = res;
  }

  // Users
  async getAllUsers() {
    const users = await User.find().exec();
    return { users };
  }

  async createUser() {
    const user = await User.create(this.input);
    return { user };
  }

  async updateUser() {
    const { id } = this.req.params;
    const user = await User.findByIdAndUpdate(id, this.input, {
      new: true,
    }).exec();
    return { user };
  }

  async deleteUser() {
    const { id } = this.req.params;
    await User.findByIdAndDelete(id).exec();
    return { id };
  }

  // Supplements
  async getSupplements() {
    const supplements = await Supplement.find().exec();
    return { supplements };
  }

  async createSupplement() {
    let imageUrl = "";
    if (this.req.file) {
      const result = await uploadImage(this.req.file.buffer);
      imageUrl = result.secure_url;
    }
    const supplement = await Supplement.create({
      name: this.req.body.name,
      description: this.req.body.description,
      price: this.req.body.price,
      stock: this.req.body.stock,
      image: imageUrl,
    });
    return { supplement };
  }

  async updateSupplement() {
    const { id } = this.req.params;
    const supplement = await Supplement.findByIdAndUpdate(id, this.input, {
      new: true,
    }).exec();
    return { id, supplement };
  }

  async deleteSupplement() {
    const { id } = this.req.params;
    await Supplement.findByIdAndDelete(id).exec();
    return { id };
  }

  // Memberships (placeholders as per controller)
  async getMembership() {
    return { message: "Fetch all memberships" };
  }

  async createMembership() {
    return { message: "Membership created" };
  }

  async updateMembership() {
    const { id } = this.req.params;
    return { id, message: `Membership with ID ${id} updated` };
  }

  async deleteMembership() {
    const { id } = this.req.params;
    return { id, message: `Membership with ID ${id} deleted` };
  }

  // Offers (placeholders)
  async getOffer() {
    return { message: "Fetch all offers" };
  }

  async createOffer() {
    return { message: "Offer created" };
  }

  async updateOffer() {
    const { id } = this.req.params;
    return { id, message: `Offer with ID ${id} updated` };
  }

  async deleteOffer() {
    const { id } = this.req.params;
    return { id, message: `Offer with ID ${id} deleted` };
  }

  // Trainers (placeholders)
  async getTrainer() {
    return { message: "Fetch all trainers" };
  }

  async createTrainer() {
    return { message: "Trainer created" };
  }

  async updateTrainer() {
    const { id } = this.req.params;
    return { id, message: `Trainer with ID ${id} updated` };
  }

  async deleteTrainer() {
    const { id } = this.req.params;
    return { id, message: `Trainer with ID ${id} deleted` };
  }
}

export default AdminService;
