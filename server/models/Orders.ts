import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  product: [
    {
      id: { type: String, required: true },
      sizes: [{ size: String, q: Number }],
    },
  ],
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  address: { type: String, required: true },
  totalValue: { type: Number },
  status: { type: String, required: true },
});

export default mongoose.model("Orders", OrderSchema);
