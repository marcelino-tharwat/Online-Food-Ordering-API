import { body } from "express-validator";
import { validateRequest } from "../validateRequest.js";

export const updateProductValidator = [
  body("name.en")
    .optional()
    .isLength({ min: 2 })
    .withMessage("English name must be at least 2 chars"),

  body("name.ar")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Arabic name must be at least 2 chars"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category").optional().isMongoId().withMessage("Invalid category id"),

  body("image").optional().notEmpty().withMessage("Image cannot be empty"),

  validateRequest,
];
