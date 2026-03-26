import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'continental_secret_key_2024_!@#';
export const PORT = process.env.PORT || 5001;
export const MONGODB_URI = process.env.MONGODB_URI;
