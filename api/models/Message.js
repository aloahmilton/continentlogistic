import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trackingNumber: String,
  subject: String,
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  attachments: [String],
  type: { type: String, enum: ['system', 'user', 'admin'], default: 'admin' }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
