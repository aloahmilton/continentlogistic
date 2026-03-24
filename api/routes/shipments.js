import express from 'express';
import Shipment from '../models/Shipment.js';
import { sendShipmentEmail, sendCustomEmail, sendInvoiceEmail, sendAdminShipmentNotification } from '../utils/email.js';
import { adminAuth, superAdminAuth } from '../middleware/auth.js';
import { geocodeAddress } from '../utils/geocoder.js';

const router = express.Router();


// Get shipment by tracking number
router.get('/:id', async (req, res) => {
  try {
    const trackingId = req.params.id.trim().toUpperCase();
    const shipment = await Shipment.findOne({ trackingNumber: trackingId });
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all shipments
router.get('/', adminAuth, async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Create shipment
router.post('/', adminAuth, async (req, res) => {
  const shipmentData = { ...req.body };
  
  // Geocode origin or current location
  const locationToGeocode = shipmentData.currentLocation || shipmentData.origin;
  const initialCoordinates = await geocodeAddress(locationToGeocode);
  shipmentData.coordinates = initialCoordinates;
  
  // Add initial update if not present
  if (!shipmentData.updates || shipmentData.updates.length === 0) {
    shipmentData.updates = [{
      status: shipmentData.status || 'pending',
      location: shipmentData.currentLocation || shipmentData.origin || 'Origin Office',
      description: req.body.initialDescription || 'Shipment information received and registered in system.',
      coordinates: initialCoordinates,
      timestamp: new Date()
    }];
  }

  const shipment = new Shipment(shipmentData);
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
    
    // Send separate internal notification to admin
    try {
      await sendAdminShipmentNotification(newShipment, req.user?.email || 'Unknown Admin');
    } catch (adminEmailError) {
      console.error('Admin Email error:', adminEmailError.message);
    }
    
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Add update to shipment
router.post('/:id/updates', adminAuth, async (req, res) => {
  try {
    const trackingId = req.params.id.trim().toUpperCase();
    const shipment = await Shipment.findOne({ trackingNumber: trackingId });
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    
    // Geocode the new location for the update
    let newCoordinates = req.body.coordinates;
    if (!newCoordinates && req.body.location) {
      newCoordinates = await geocodeAddress(req.body.location);
    }
    
    const updateEntry = {
      ...req.body,
      coordinates: newCoordinates || { lat: 0, lng: 0 }
    };
    
    shipment.updates.push(updateEntry);
    shipment.status = req.body.status;
    shipment.currentLocation = req.body.location;
    
    // Update main coordinates if new ones were found
    if (newCoordinates && (newCoordinates.lat !== 0 || newCoordinates.lng !== 0)) {
      shipment.coordinates = newCoordinates;
    }
    
    await shipment.save();
    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Send custom email to customer
router.post('/:id/communicate', adminAuth, async (req, res) => {
  try {
    const trackingId = req.params.id.trim().toUpperCase();
    const shipment = await Shipment.findOne({ trackingNumber: trackingId });
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    
    const { to, subject, message } = req.body;
    await sendCustomEmail(to, subject, message, shipment.trackingNumber);
    
    // Log the communication in updates
    shipment.updates.push({
      status: shipment.status,
      location: 'Admin Portal',
      description: `Support Message Sent to ${to}: ${subject}`,
      timestamp: new Date()
    });
    
    await shipment.save();
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Send invoice to customer
router.post('/:id/invoice', adminAuth, async (req, res) => {
  try {
    const trackingId = req.params.id.trim().toUpperCase();
    const shipment = await Shipment.findOne({ trackingNumber: trackingId });
    if (!shipment) return res.status(404).json({ message: 'Shipment not found' });
    
    await sendInvoiceEmail(shipment, req.body);
    
    // Log in updates
    shipment.updates.push({
      status: shipment.status,
      location: 'Billing Dept',
      description: `Invoice for $${req.body.total || req.body.amount} sent to customer`,
      timestamp: new Date()
    });
    
    await shipment.save();
    res.json({ message: 'Invoice sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update shipment details
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const trackingId = req.params.id.trim().toUpperCase();
    const updates = { ...req.body };

    // If currentLocation changed, geocode it
    if (updates.currentLocation) {
        const coords = await geocodeAddress(updates.currentLocation);
        if (coords.lat !== 0 || coords.lng !== 0) {
            updates.coordinates = coords;
        }
    }

    const updatedShipment = await Shipment.findOneAndUpdate(
      { trackingNumber: trackingId },
      updates,
      { new: true }
    );
    if (!updatedShipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json(updatedShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Delete shipment - Super Admin Only
router.delete('/:id', superAdminAuth, async (req, res) => {
  try {
    const trackingId = req.params.id.trim().toUpperCase();
    const deletedShipment = await Shipment.findOneAndDelete({ trackingNumber: trackingId });
    if (!deletedShipment) return res.status(404).json({ message: 'Shipment not found' });
    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
