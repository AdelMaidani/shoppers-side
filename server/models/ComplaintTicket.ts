import mongoose from "mongoose";

const CustomerTicket = new mongoose.Schema({
  complaintTitle: { type: String, required: true },
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Customer Ticket", CustomerTicket);
