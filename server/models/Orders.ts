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
  totalValue: { type: Number },
  status: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  street1: { type: String, required: true },
  street2: { type: String, required: true },
  pincode: { type: Number, required: true },
  shippingMethod: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  nameOnCard: { type: String, required: true },
  countryOnCard: { type: String, required: true },
  trackingNumber: { type: String },
});

export default mongoose.model("Orders", OrderSchema);
