import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import User from './models/User.js';

const checkUsers = async () => {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        const users = await User.find({}, { name: 1, email: 1, role: 1, status: 1 });
        console.log('--- Current Users in DB ---');
        console.table(users.map(u => ({
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status
        })));
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

checkUsers();
