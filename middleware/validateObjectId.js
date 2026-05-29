import { param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest.js";

export const idParamValidator = (paramName = "id") => [
  param(paramName)
    .notEmpty()
    .withMessage(`missing ${paramName} param`)
    .isMongoId()
    .withMessage(`Invalid ${paramName} format`),
  validateRequest,
];
