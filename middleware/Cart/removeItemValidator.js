import { param } from "express-validator";
import { validateRequest } from "../validateRequest.js";
export const removeItemValidator = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),

  validateRequest,
];
