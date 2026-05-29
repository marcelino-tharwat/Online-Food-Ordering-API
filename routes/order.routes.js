import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth/protect.js";
import { adminOnly } from "../middleware/auth/adminOnly.js";
import { idParamValidator } from "../middleware/validateObjectId.js";
import { createOrderValidator } from "../middleware/order/OrderValidator.js";
import { checkOrderAccess } from "../middleware/order/checkOrderAccess.js";
const router = express.Router();

router.post("/", protect, createOrderValidator, createOrder);

router.get("/my", protect, getMyOrders);

router.get("/admin", protect, adminOnly, getAllOrders);

router.patch(
  "/admin/:id/status",
  protect,
  adminOnly,
  idParamValidator("id"),
  updateOrderStatus,
);

router.get(
  "/:id",
  protect,
  idParamValidator("id"),
  checkOrderAccess,
  getOrderById,
);
export default router;
