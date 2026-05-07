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

const checkDB = async () => {
  try {
    await connectDB();

    const counts = {
      shipments: await Shipment.countDocuments(),
      users: await User.countDocuments(),
      leads: await Lead.countDocuments(),
      drivers: await Driver.countDocuments(),
      invoices: await Invoice.countDocuments(),
      messages: await Message.countDocuments(),
      settings: await Setting.countDocuments()
    };

    console.log('Database population check:');
    Object.entries(counts).forEach(([entity, count]) => {
      console.log(`${entity}: ${count} documents`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Check failed:', error);
    process.exit(1);
  }
};

checkDB();