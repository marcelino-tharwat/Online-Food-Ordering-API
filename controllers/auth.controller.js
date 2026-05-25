import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { ApiError } from "../utils/apiError.js";
import catchAsync from "../utils/catchAsync.js";

// POST /auth/register
export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    return next(new ApiError("User with this email already exists", 400));
  }

  // Create user (password hashed by pre-save middleware)
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    status: "success",
    message: "User registered successfully",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// POST /auth/login
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user by email (include password for comparison)
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user) {
    return next(new ApiError("Invalid email or password", 401));
  }

  // Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ApiError("Invalid email or password", 401));
  }

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    status: "success",
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
