import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import shipmentRoutes from './routes/shipments.js';
import leadRoutes from './routes/leads.js';
import driverRoutes from './routes/drivers.js';
import invoiceRoutes from './routes/invoices.js';
import messageRoutes from './routes/messages.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/shipments', shipmentRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Continental Track API is active' });
});

// Catch-all 404 for debugging
app.use((req, res) => {
  console.log(`404 NOT FOUND: ${req.method} ${req.url}`);
  res.status(404).json({ message: `Path ${req.url} not found on backend server` });
});

// For Vercel, we export default the app
export default app;

// For local testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  // Use a conditional listen to avoid address in use errors in some environments
  if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}
