import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../db.js';

dotenv.config();

const seedAdmins = async () => {
  try {
    await connectDB();

    // Clear existing admins to avoid duplicates if re-running
    await User.deleteMany({ role: { $in: ['admin', 'super_admin'] } });

    const admins = [
      {
        name: 'Continental Super Admin',
        email: 'super@continentlogistic.com',
        password: 'admin123',
        role: 'super_admin',
        status: 'active',
        accountType: 'individual'
      },
      {
        name: 'Logistics Manager 01',
        email: 'admin@continentlogistic.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        accountType: 'individual'
      },
      {
        name: 'Continental Admin 01',
        email: 'Continentlogistic01@gmail.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        accountType: 'individual'
      },
      {
        name: 'Fleet Dispatcher 02',
        email: 'admin@continentlogistic.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        accountType: 'individual'
      }
    ];

    for (const adminData of admins) {
      const admin = new User(adminData);
      await admin.save();
      console.log(`Created ${admin.role}: ${admin.email}`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedAdmins();
