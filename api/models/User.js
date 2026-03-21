import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
