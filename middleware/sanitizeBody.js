import { ApiError } from "../utils/apiError.js";

// Global body sanitizer - ensures req.body is always a safe object
// Runs early in the pipeline before any route handler
export const sanitizeBody = (req, res, next) => {
  // Handle missing body (undefined or null)
  if (req.body === undefined || req.body === null) {
    req.body = {};
  }

  // Handle invalid body types (non-object)
  if (typeof req.body !== "object" || Array.isArray(req.body)) {
    return next(new ApiError("Invalid request body format", 400));
  }

  next();
};
