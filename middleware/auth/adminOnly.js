import { ApiError } from "../../utils/apiError.js";

// Middleware to check if user is admin
// Must run AFTER verifyToken
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return next(new ApiError("Admin access only", 403));
};
