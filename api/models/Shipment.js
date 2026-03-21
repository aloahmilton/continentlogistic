import mongoose from 'mongoose';

const shipmentUpdateSchema = new mongoose.Schema({
  status: { type: String, required: true },
  location: String,
  description: String,
  timestamp: { type: Date, default: Date.now }
});

const shipmentSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  sender: {
    name: String,
    email: String,
    phone: String
  },
  receiver: {
    name: String,
    email: String,
    phone: String
  },
  origin: String,
  destination: String,
  currentLocation: String,
  status: { 
    type: String, 
    enum: ['pending', 'picked_up', 'in_transit', 'arrived', 'out_for_delivery', 'delivered', 'on_hold', 'returned'],
    default: 'pending' 
  },
  serviceType: String,
  productDetails: String,
  weight: Number,
  dimensions: String,
  estimatedDelivery: Date,
  coordinates: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  updates: [shipmentUpdateSchema]
}, { timestamps: true });

const Shipment = mongoose.model('Shipment', shipmentSchema);
export default Shipment;
