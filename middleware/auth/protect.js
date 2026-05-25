import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import catchAsync from "../../utils/catchAsync.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // Read token from Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If token missing
  if (!token) {
    return next(new ApiError("Not authenticated", 401));
  }

  // Verify token using JWT_SECRET
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new ApiError("Your token has expired! please log in again!", 401),
      );
    }
    return next(new ApiError("Invalid token. please log in again!", 401));
  }

  // Fetch user from database by id
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new ApiError("The user belonging to this token no longer exists", 401),
    );
  }

  // Attach full user object to req.user
  req.user = currentUser;

  next();
});
