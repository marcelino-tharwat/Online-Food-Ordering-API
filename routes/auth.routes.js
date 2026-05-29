import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidator } from "../middleware/auth/validateRegister.js";
import { loginValidator } from "../middleware/auth/validateLogin.js";

const router = express.Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);

export default router;
