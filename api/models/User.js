import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['individual', 'company'], default: 'individual' },
  companyName: String,
  industry: String,
  taxId: String,
  phone: String,
  status: { type: String, enum: ['active', 'pending', 'suspended'], default: 'active' },
  role: { type: String, default: 'user' },
  language: { type: String, default: 'English (US)' },
  timezone: { type: String, default: 'UTC +00:00' }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
