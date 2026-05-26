import express from "express";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { getOne } from "../utils/handlers.js";
import { protect } from "../middleware/auth/protect.js";
import { adminOnly } from "../middleware/auth/adminOnly.js";

const router = express.Router();

// Public routes
router.route("/").get(getAllCategories);
router
  .route("/:id")
  .get(getOne(Category, { path: "products", match: { category: null } }));

// Admin routes
router.route("/").post(protect, adminOnly, createCategory);

router
  .route("//:id")
  .put(protect, adminOnly, updateCategory)
  .delete(protect, adminOnly, deleteCategory);

export default router;
