import { ApiError } from "../../utils/apiError.js";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError("Please provide email and password", 400));
  }

  if (!emailRegex.test(email)) {
    return next(new ApiError("Please provide a valid email address", 400));
  }

  next();
};
