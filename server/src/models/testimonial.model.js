import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, trim: true, default: "Customer Moment" },
    image: {
      url: { type: String, default: "" },
      filename: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

testimonialSchema.index({ customerName: "text" });

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
