import Product from "../models/Product.js";
import { ApiError } from "../utils/apiError.js";
import catchAsync from "../utils/catchAsync.js";

export const getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({ success: true, count: products.length, products });
});

export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({ ...req.body, user: req.user._id });
  res.status(201).json({ success: true, product });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  Object.assign(product, req.body);
  await product.save();
  res.status(200).json({ success: true, product });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ success: true, message: "Product removed" });
});
