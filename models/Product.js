import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, "English name is required"],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, "Arabic name is required"],
        trim: true,
      },
    },
    description: {
      en: {
        type: String,
        default: "",
      },
      ar: {
        type: String,
        default: "",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export model safely (prevents model overwrite during hot reload)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
