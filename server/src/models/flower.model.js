import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    priceLabel: { type: String, trim: true, default: "" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: {
      url: { type: String, default: "" },
      filename: { type: String, default: "" },
    },
    tags: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

flowerSchema.index({ name: "text", description: "text", tags: "text" });
flowerSchema.index({ category: 1, price: 1, createdAt: -1 });

export const Flower = mongoose.model("Flower", flowerSchema);
