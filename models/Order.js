import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: String,
        quantity: Number,
        price: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
