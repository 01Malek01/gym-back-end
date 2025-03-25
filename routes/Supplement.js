import express from "express";
import { getAllSupplements } from "../controllers/Supplement.js";
const router = express.Router();

router.get("/allSupplements", getAllSupplements);

export default router;
