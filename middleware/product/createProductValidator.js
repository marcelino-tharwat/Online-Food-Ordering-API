import { body } from "express-validator";
import { validateRequest } from "../validateRequest.js";
export const createProductValidator = [
  body("name.en")
    .notEmpty()
    .withMessage("English name is required")
    .isLength({ min: 2 })
    .withMessage("English name must be at least 2 chars"),

  body("name.ar")
    .notEmpty()
    .withMessage("Arabic name is required")
    .isLength({ min: 2 })
    .withMessage("Arabic name must be at least 2 chars"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category id"),

  body("image").notEmpty().withMessage("Image is required"),
  validateRequest,
];
