import { ApiError } from "../../utils/apiError.js";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ApiError("Please provide name, email and password", 400));
  }

  if (name.trim().length < 2) {
    return next(new ApiError("Name must be at least 2 characters", 400));
  }

  if (!emailRegex.test(email)) {
    return next(new ApiError("Please provide a valid email address", 400));
  }

  if (password.length < 6) {
    return next(new ApiError("Password must be at least 6 characters", 400));
  }

  next();
};
