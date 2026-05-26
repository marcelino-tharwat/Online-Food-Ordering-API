import Category from "../models/Category.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/handlers.js";

// Public
export const getAllCategories = getAll(Category);
export const getCategory = getOne(Category);

// Admin
export const createCategory = createOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
