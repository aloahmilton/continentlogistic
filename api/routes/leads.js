import express from 'express';
import Lead from '../models/Lead.js';
import { sendAdminLeadNotification } from '../utils/email.js';

const router = express.Router();

// Create lead
router.post('/', async (req, res) => {
  const lead = new Lead(req.body);
  try {
    const newLead = await lead.save();
    // Send email to admin
    try {
      await sendAdminLeadNotification(newLead);
    } catch (emailError) {
      console.error('Email error:', emailError.message);
    }
    res.status(201).json(newLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Get all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
