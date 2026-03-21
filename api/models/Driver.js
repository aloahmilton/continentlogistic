import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleType: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  currentLocation: { type: String, default: 'Hub' },
  coords: {
    lat: Number,
    lng: Number
  },
  status: { type: String, enum: ['active', 'on_delivery', 'offline'], default: 'offline' },
  rating: { type: Number, default: 5.0 },
  trips: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Driver", driverSchema);
