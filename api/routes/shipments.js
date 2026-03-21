import express from 'express';
import Shipment from '../models/Shipment.js';
import { sendShipmentEmail } from '../utils/email.js';

const router = express.Router();

// Get shipment by tracking number
router.get('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingNumber: req.params.id });
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Create shipment
router.post('/', async (req, res) => {
  const shipment = new Shipment(req.body);
  try {
    const newShipment = await shipment.save();
    // Send email to receiver
    if (newShipment.receiver && newShipment.receiver.email) {
      try {
        await sendShipmentEmail(newShipment);
      } catch (emailError) {
        console.error('Email error:', emailError.message);
      }
    }
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Add update to shipment
router.post('/:id/updates', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingNumber: req.params.id });
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    
    shipment.updates.push(req.body);
    shipment.status = req.body.status;
    shipment.currentLocation = req.body.location;
    
    await shipment.save();
    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
