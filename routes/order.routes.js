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

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);

router.get("/admin", protect, adminOnly, getAllOrders);

router.patch("/admin/:id/status", protect, adminOnly, updateOrderStatus);

router.get("/:id", protect, getOrderById);
export default router;
