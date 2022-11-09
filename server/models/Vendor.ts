import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Vendor", VendorSchema);
