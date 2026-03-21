import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  trackingNumber: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: String,
  customerEmail: String,
  amount: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' },
  dueDate: Date,
  paidDate: Date,
  proofImage: String
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
