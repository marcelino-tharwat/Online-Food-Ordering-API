import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth/protect.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
