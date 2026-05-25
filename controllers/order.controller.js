import Order from "../models/Order.js";
import { ApiError } from "../utils/apiError.js";
import catchAsync from "../utils/catchAsync.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ApiError("No order items", 400));
  }

  const order = await Order.create({ user: req.user._id, orderItems, shippingAddress, totalPrice });
  res.status(201).json({ success: true, order });
});

export const getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({ success: true, count: orders.length, orders });
});

export const getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  res.status(200).json({ success: true, order });
});

export const updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ApiError("Order not found", 404));
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();
  res.status(200).json({ success: true, order });
});
