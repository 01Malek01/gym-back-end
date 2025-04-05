import express from "express";
import { getAllSupplements, getSupplement } from "../controllers/Supplement.js";
const router = express.Router();

router.get("/allSupplements", getAllSupplements);
router.get("/:id", getSupplement);

export default router;
