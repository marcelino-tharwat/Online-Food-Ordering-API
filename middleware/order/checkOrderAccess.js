import Order from "../../models/Order.js";
import catchAsync from "../../utils/catchAsync.js";
import { ApiError } from "../../utils/apiError.js";

export const checkOrderAccess = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "items.product user",
  );

  if (!order) {
    return next(new ApiError("Order not found", 404));
  }

  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ApiError("Not authorized", 403));
  }

  req.order = order;
  next();
});
