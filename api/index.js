import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import shipmentRoutes from './routes/shipments.js';
import leadRoutes from './routes/leads.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/shipments', shipmentRoutes);
app.use('/api/leads', leadRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Continental Track API is active' });
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
