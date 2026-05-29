import { body } from "express-validator";
import { validateRequest } from "../validateRequest.js";
export const createOrderValidator = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 chars"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^01[0-2,5]{1}[0-9]{8}$/)
    .withMessage("Invalid Egyptian phone number"),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5 })
    .withMessage("Address is too short"),
  validateRequest,
];
