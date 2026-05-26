import express from "express";
import { protect } from "../middleware/auth/protect.js";
import {
  addItem,
  removeItem,
  updateQty,
  clearCart,
  getCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/add", addItem);
router.put("/update", updateQty);
router.delete("/remove/:productId", removeItem);
router.delete("/clear", clearCart);

export default router;
