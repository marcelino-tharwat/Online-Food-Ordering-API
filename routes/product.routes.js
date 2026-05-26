import express from "express";
import Product from "../models/Product.js";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth/protect.js";
import { adminOnly } from "../middleware/auth/adminOnly.js";
import { validateProduct } from "../middleware/validate.middleware.js";
const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Admin routes
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
