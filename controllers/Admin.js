import expressAsyncHandler from "express-async-handler";
import AdminService from "../services/AdminService.js";
// Controllers for managing users
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { users } = await adminService.getAllUsers();
  res.status(200).json({ success: true, users });
});

export const createUser = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { user } = await adminService.createUser();
  res.status(201).json({ success: true, user });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { user } = await adminService.updateUser();
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res
    .status(200)
    .json({ success: true, data: `User with ID ${req.params.id} updated` });
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { id } = await adminService.deleteUser();
  res.status(200).json({ success: true, data: `User with ID ${id} deleted` });
});

// Controllers for managing supplements
export const getSupplements = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { supplements } = await adminService.getSupplements();
  res.status(200).send(supplements);
});

export const createSupplement = expressAsyncHandler(async (req, res) => {
  try {
    const adminService = new AdminService(req.body, req, res);
    const { supplement } = await adminService.createSupplement();
    res.status(201).json({ success: true, supplement });
  } catch (error) {
    console.error("Error creating supplement:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export const updateSupplement = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { id } = await adminService.updateSupplement();
  res
    .status(200)
    .json({ success: true, data: `Supplement with ID ${id} updated` });
});

export const deleteSupplement = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { id } = await adminService.deleteSupplement();
  res
    .status(200)
    .json({ success: true, data: `Supplement with ID ${id} deleted` });
});

// Controllers for managing memberships
export const getMembership = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { message } = await adminService.getMembership();
  res.status(200).json({ success: true, data: message });
});

export const createMembership = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { message } = await adminService.createMembership();
  res.status(201).json({ success: true, data: message });
});

export const updateMembership = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { id, message } = await adminService.updateMembership();
  res.status(200).json({ success: true, data: message });
});

export const deleteMembership = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { id, message } = await adminService.deleteMembership();
  res.status(200).json({ success: true, data: message });
});

// Controllers for managing offers
export const getOffer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { message } = await adminService.getOffer();
  res.status(200).json({ success: true, data: message });
});

export const createOffer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { message } = await adminService.createOffer();
  res.status(201).json({ success: true, data: message });
});

export const updateOffer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { id, message } = await adminService.updateOffer();
  res.status(200).json({ success: true, data: message });
});

export const deleteOffer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { id, message } = await adminService.deleteOffer();
  res.status(200).json({ success: true, data: message });
});

// Controllers for managing trainers
export const getTrainer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { message } = await adminService.getTrainer();
  res.status(200).json({ success: true, data: message });
});

export const createTrainer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { message } = await adminService.createTrainer();
  res.status(201).json({ success: true, data: message });
});

export const updateTrainer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(req.body, req, res);
  const { id, message } = await adminService.updateTrainer();
  res.status(200).json({ success: true, data: message });
});

export const deleteTrainer = expressAsyncHandler(async (req, res) => {
  const adminService = new AdminService(null, req, res);
  const { id, message } = await adminService.deleteTrainer();
  res.status(200).json({ success: true, data: message });
});
