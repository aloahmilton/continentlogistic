import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  serviceType: String,
  fromLocation: String,
  toLocation: String,
  message: String,
  status: { type: String, default: 'new' }
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
