import { body } from "express-validator";
import { validateRequest } from "../validateRequest.js";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),

  validateRequest,
];
