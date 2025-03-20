import Supplement from "../models/Supplement.js";
import User from "../models/User.js";

// Controllers for managing users
export const getAllUsers = async (req, res) => {
  try {
    // Logic to fetch all users
    const users = await User.find().exec();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    // Logic to create a new user
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Logic to update a user by ID
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res
      .status(200)
      .json({ success: true, data: `User with ID ${req.params.id} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Logic to delete a user by ID
    const { id } = req.params;
    await User.findByIdAndDelete(id).exec();
    res.status(200).json({ success: true, data: `User with ID ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controllers for managing supplements
export const getSupplements = async (req, res) => {
  try {
    const supplements = await Supplement.find().exec();
    res.status(200).send(supplements);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSupplement = async (req, res) => {
  try {
    const supplement = await Supplement.create(req.body);
    console.log(" req body supplement ", req.body);
    res.status(201).json({ success: true, supplement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSupplement = async (req, res) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ success: true, data: `Supplement with ID ${id} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSupplement = async (req, res) => {
  try {
    const { id } = req.params;
    await Supplement.findByIdAndDelete(id).exec();
    res
      .status(200)
      .json({ success: true, data: `Supplement with ID ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controllers for managing memberships
export const getMembership = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: "Fetch all memberships" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMembership = async (req, res) => {
  try {
    res.status(201).json({ success: true, data: "Membership created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ success: true, data: `Membership with ID ${id} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ success: true, data: `Membership with ID ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controllers for managing offers
export const getOffer = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: "Fetch all offers" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOffer = async (req, res) => {
  try {
    res.status(201).json({ success: true, data: "Offer created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ success: true, data: `Offer with ID ${id} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ success: true, data: `Offer with ID ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controllers for managing trainers
export const getTrainer = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: "Fetch all trainers" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTrainer = async (req, res) => {
  try {
    res.status(201).json({ success: true, data: "Trainer created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ success: true, data: `Trainer with ID ${id} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    res
      .status(200)
      .json({ success: true, data: `Trainer with ID ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
