import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

// Export model safely
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
