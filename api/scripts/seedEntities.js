import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Shipment from '../models/Shipment.js';
import User from '../models/User.js';
import Lead from '../models/Lead.js';
import Driver from '../models/Driver.js';
import Invoice from '../models/Invoice.js';
import Message from '../models/Message.js';
import Setting from '../models/Setting.js';
import connectDB from '../db.js';

dotenv.config();

const seedEntities = async () => {
  try {
    await connectDB();

    // Clear existing data (optional, for fresh seed)
    await Shipment.deleteMany({});
    await User.deleteMany({});
    await Lead.deleteMany({});
    await Driver.deleteMany({});
    await Invoice.deleteMany({});
    await Message.deleteMany({});
    await Setting.deleteMany({});

    // Seed Settings
    const settings = [
      { key: 'company_name', value: 'Continent Logistic.org' },
      { key: 'support_email', value: 'support@continentlogistic.org' },
      { key: 'timezone', value: 'UTC-5' }
    ];
    await Setting.insertMany(settings);
    console.log('Seeded settings');

    // Seed Users (regular customers)
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        accountType: 'individual',
        phone: '+1234567890',
        status: 'active'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        accountType: 'company',
        companyName: 'ABC Corp',
        phone: '+0987654321',
        status: 'active'
      }
    ];
    await User.insertMany(users);
    console.log('Seeded users');

    // Seed Drivers
    const drivers = [
      {
        name: 'Mike Johnson',
        phone: '+1112223333',
        vehicleType: 'Truck',
        licensePlate: 'ABC123',
        currentLocation: 'New York',
        coords: { lat: 40.7128, lng: -74.0060 },
        status: 'active',
        rating: 4.8,
        trips: 150
      },
      {
        name: 'Sarah Lee',
        phone: '+4445556666',
        vehicleType: 'Van',
        licensePlate: 'XYZ789',
        currentLocation: 'Los Angeles',
        coords: { lat: 34.0522, lng: -118.2437 },
        status: 'on_delivery',
        rating: 4.9,
        trips: 200
      }
    ];
    await Driver.insertMany(drivers);
    console.log('Seeded drivers');

    // Seed Shipments
    const shipments = [
      {
        trackingNumber: 'CL123456789',
        sender: { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
        receiver: { name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321' },
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        currentLocation: 'Chicago, IL',
        status: 'in_transit',
        serviceType: 'Express',
        weight: 10,
        dimensions: '10x10x10',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        coordinates: { lat: 41.8781, lng: -87.6298 },
        destinationCoordinates: { lat: 34.0522, lng: -118.2437 },
        updates: [
          { status: 'picked_up', location: 'New York, NY', description: 'Package picked up', coordinates: { lat: 40.7128, lng: -74.0060 } },
          { status: 'in_transit', location: 'Chicago, IL', description: 'In transit to destination', coordinates: { lat: 41.8781, lng: -87.6298 } }
        ]
      },
      {
        trackingNumber: 'CL987654321',
        sender: { name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321' },
        receiver: { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
        origin: 'Los Angeles, CA',
        destination: 'New York, NY',
        currentLocation: 'Dallas, TX',
        status: 'out_for_delivery',
        serviceType: 'Standard',
        weight: 5,
        dimensions: '5x5x5',
        estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        coordinates: { lat: 32.7767, lng: -96.7970 },
        destinationCoordinates: { lat: 40.7128, lng: -74.0060 },
        updates: [
          { status: 'picked_up', location: 'Los Angeles, CA', description: 'Package picked up', coordinates: { lat: 34.0522, lng: -118.2437 } },
          { status: 'in_transit', location: 'Dallas, TX', description: 'Out for delivery', coordinates: { lat: 32.7767, lng: -96.7970 } }
        ]
      }
    ];
    await Shipment.insertMany(shipments);
    console.log('Seeded shipments');

    // Seed Leads
    const leads = [
      {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        phone: '+7778889999',
        serviceType: 'Express',
        fromLocation: 'Miami, FL',
        toLocation: 'Boston, MA',
        message: 'Need urgent delivery',
        status: 'new'
      },
      {
        name: 'Alice Brown',
        email: 'alice@example.com',
        phone: '+0001112222',
        serviceType: 'Standard',
        fromLocation: 'Seattle, WA',
        toLocation: 'Austin, TX',
        message: 'Large shipment',
        status: 'contacted'
      }
    ];
    await Lead.insertMany(leads);
    console.log('Seeded leads');

    // Seed Invoices (link to shipments and users)
    const seededUsers = await User.find({});
    const seededShipments = await Shipment.find({});
    const invoices = [
      {
        invoiceNumber: 'INV001',
        trackingNumber: seededShipments[0].trackingNumber,
        customerId: seededUsers[0]._id,
        customerName: seededUsers[0].name,
        customerEmail: seededUsers[0].email,
        amount: 100,
        tax: 10,
        total: 110,
        status: 'pending',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      {
        invoiceNumber: 'INV002',
        trackingNumber: seededShipments[1].trackingNumber,
        customerId: seededUsers[1]._id,
        customerName: seededUsers[1].name,
        customerEmail: seededUsers[1].email,
        amount: 50,
        tax: 5,
        total: 55,
        status: 'paid',
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        paidDate: new Date()
      }
    ];
    await Invoice.insertMany(invoices);
    console.log('Seeded invoices');

    // Seed Messages (link to users)
    const messages = [
      {
        sender: seededUsers[0]._id,
        receiver: seededUsers[1]._id,
        trackingNumber: seededShipments[0].trackingNumber,
        subject: 'Shipment Update',
        message: 'Your package is in transit.',
        type: 'system'
      },
      {
        sender: seededUsers[1]._id,
        receiver: seededUsers[0]._id,
        trackingNumber: seededShipments[1].trackingNumber,
        subject: 'Delivery Confirmation',
        message: 'Please confirm delivery address.',
        type: 'user'
      }
    ];
    await Message.insertMany(messages);
    console.log('Seeded messages');

    console.log('All entities seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedEntities();