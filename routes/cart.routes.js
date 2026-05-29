import express from "express";
import { protect } from "../middleware/auth/protect.js";
import {
  addItem,
  removeItem,
  updateQty,
  clearCart,
  getCart,
} from "../controllers/cart.controller.js";
import { addItemValidator } from "../middleware/Cart/addItemValidator.js";
import { removeItemValidator } from "../middleware/Cart/removeItemValidator.js";
import { updateQtyValidator } from "../middleware/Cart/updateQtyValidator.js";

const router = express.Router();

router.use(protect);

router.get("/", getCart);
router.post("/add", addItemValidator, addItem);
router.put("/update", updateQtyValidator, updateQty);
router.delete("/remove/:productId", removeItemValidator, removeItem);
router.delete("/clear", clearCart);

export default router;
