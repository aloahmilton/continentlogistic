const mongoose = require('mongoose');
const Shipment = require('./models/Shipment');
const Lead = require('./models/Lead');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data (optional)
    await Shipment.deleteMany({});
    await Lead.deleteMany({});

    // Seed Shipments
    const shipments = [
      {
        trackingNumber: 'CT88294021',
        sender: { name: 'Global Tech Corp', email: 'logistics@globaltech.com', phone: '+1 415-555-0123' },
        receiver: { name: 'Alina Milano', email: 'alina.m@example.com', phone: '+44 20 7946 0958' },
        origin: 'San Francisco, USA',
        destination: 'London, UK',
        status: 'in_transit',
        serviceType: 'Express International',
        currentLocation: 'New York Distribution Center',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        updates: [
          { status: 'in_transit', location: 'New York Distribution Center', description: 'Consignment departed from local hub.', timestamp: new Date(Date.now() - 3600000 * 5) },
          { status: 'pending', location: 'San Francisco Hub', description: 'Package picked up by courier.', timestamp: new Date(Date.now() - 3600000 * 24) }
        ]
      },
      {
        trackingNumber: 'CT11930482',
        sender: { name: 'Nordic Designs', email: 'shipping@nordic.se', phone: '+46 8 123 456' },
        receiver: { name: 'John Peterson', email: 'john.p@gmail.com', phone: '+237 659 036 005' },
        origin: 'Stockholm, Sweden',
        destination: 'Douala, Cameroon',
        status: 'delivered',
        serviceType: 'Standard Shipping',
        currentLocation: 'Douala Port Terminal',
        coordinates: { lat: 4.0511, lng: 9.7679 },
        updates: [
          { status: 'delivered', location: 'Douala, Cameroon', description: 'Package delivered to recipient.', timestamp: new Date(Date.now() - 3600000 * 12) },
          { status: 'in_transit', location: 'Sea Transit', description: 'Vessel arrived at port.', timestamp: new Date(Date.now() - 3600000 * 72) }
        ]
      }
    ];

    // Seed Leads
    const leads = [
      {
        name: 'James Wilson',
        email: 'j.wilson@forwarding.com',
        phone: '+1 650 555 9876',
        serviceType: 'Freight Forwarding',
        fromLocation: 'Shanghai, China',
        toLocation: 'Miami, USA',
        message: 'Looking for a quote for a 20ft container shipment scheduled for next month.',
        status: 'pending'
      }
    ];

    await Shipment.insertMany(shipments);
    await Lead.insertMany(leads);

    console.log('Database successfully seeded!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
