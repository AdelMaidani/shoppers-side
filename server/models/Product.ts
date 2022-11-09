import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, required: true },
  size: { type: Object, required: false },
  coverPhoto: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("Product", ProductSchema);
