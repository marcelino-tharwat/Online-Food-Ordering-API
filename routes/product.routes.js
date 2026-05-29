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
import { idParamValidator } from "../middleware/validateObjectId.js";
import { createProductValidator } from "../middleware/product/createProductValidator.js";
import { updateProductValidator } from "../middleware/product/updateProductValidator.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", idParamValidator("id"), getProduct);

// Admin routes
router.post("/", protect, adminOnly, createProductValidator, createProduct);
router.put(
  "/:id",
  protect,
  adminOnly,
  idParamValidator("id"),
  updateProductValidator,
  updateProduct,
);
router.delete(
  "/:id",
  protect,
  adminOnly,
  idParamValidator("id"),
  deleteProduct,
);

export default router;
