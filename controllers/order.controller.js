import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import catchAsync from "../utils/catchAsync.js";
import { ApiError } from "../utils/apiError.js";
import { getAll, getOne } from "../utils/handlers.js";

export const createOrder = catchAsync(async (req, res, next) => {
  const { fullName, phoneNumber, address } = req.body;

  if (!fullName) {
    return next(new ApiError("Full name is required", 400));
  }
  if (!phoneNumber) {
    return next(new ApiError("Phone number is required", 400));
  }
  if (!address) {
    return next(new ApiError("Address is required", 400));
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  if (!cart || cart.items.length === 0) {
    return next(new ApiError("Cart is empty or not found", 400));
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    total,
    fullName,
    phoneNumber,
    address,
  });

  cart.items = [];
  await cart.save();

  res.status(201).json({ success: true, data: order });
});

export const getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name price image")
    .select("fullName phoneNumber address items total status paymentMethod")
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: orders.length, data: orders });
});

export const getAllOrders = getAll(Order);
export const getOrderById = getOne(Order, "items.product user");

const VALID_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["delivered"],
  delivered: [],
  cancelled: [],
};

export const cancelOrder = catchAsync(async (req, res, next) => {
  const order = req.order;

  if (order.status !== "pending") {
    return next(
      new ApiError("Only pending orders can be cancelled", 400),
    );
  }

  order.status = "cancelled";
  await order.save();

  res.status(200).json({ success: true, data: order });
});

export const adminUpdateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ApiError("Order not found", 404));
  }

  const allowedNext = VALID_TRANSITIONS[order.status];
  if (!allowedNext || !allowedNext.includes(status)) {
    return next(
      new ApiError(
        `Cannot transition from "${order.status}" to "${status}"`,
        400,
      ),
    );
  }

  order.status = status;
  await order.save();

  res.status(200).json({ success: true, data: order });
});
