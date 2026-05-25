import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { validateRegister } from "../middleware/validators/validateRegister.js";
import { validateLogin } from "../middleware/validators/validateLogin.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
