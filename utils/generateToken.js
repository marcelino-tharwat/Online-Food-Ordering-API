import jwt from "jsonwebtoken";

// Generate JWT token with 7-day expiration
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
