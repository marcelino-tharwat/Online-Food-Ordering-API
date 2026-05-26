import Product from "../models/Product.js";
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/handlers.js";

export const getAllProducts = getAll(Product);
export const getProduct = getOne(Product, "category");
export const createProduct = createOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
