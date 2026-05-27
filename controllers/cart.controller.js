import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../utils/apiError.js";

export const getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  if (!cart) {
    cart = { user: req.user._id, items: [] };
    return res.status(200).json({
      success: true,
      data: { items: [], total: 0 },
      total: 0,
    });
  }

  const total = cart.items.reduce((sum, item) => {
    if (item.product) {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  res.status(200).json({
    success: true,
    data: cart,
    total,
  });
});

export const addItem = catchAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return next(new ApiError("Product ID is required", 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });

    return res.status(200).json({
      success: true,
      data: cart,
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
  });
});

export const removeItem = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  res.status(200).json({ success: true, data: cart });
});

export const updateQty = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity === undefined) {
    return next(new ApiError("Product ID and quantity are required", 400));
  }

  if (quantity < 1) {
    return next(new ApiError("Quantity must be at least 1", 400));
  }

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  const item = cart.items.find((item) => item.product.toString() === productId);
  if (!item) {
    return next(new ApiError("Product not found in cart", 404));
  }

  item.quantity = quantity;
  await cart.save();

  res.status(200).json({ success: true, data: cart });
});

export const clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({ success: true, data: cart });
});
