import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { connectDB } from "./config/db.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import { sanitizeBody } from "./middleware/sanitizeBody.js";
import uploadRoutes from "./routes/upload.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import { ApiError } from "./utils/apiError.js";
import cartRoutes from "./routes/cart.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

// Sanitize body before any route handler
app.use(sanitizeBody);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", uploadRoutes);
app.all(/(.*)/, (req, res, next) => {
  next(new ApiError(`Cant not find ${req.originalUrl} on this server`, 404));
});

// Global error handler (must be last)
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
