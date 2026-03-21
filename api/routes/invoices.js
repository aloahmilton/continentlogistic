import express from 'express';
import Invoice from '../models/Invoice.js';
import Shipment from '../models/Shipment.js';
import { sendInvoiceEmail } from '../utils/email.js';
import { adminAuth, superAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create invoice
router.post('/', async (req, res) => {
  const invoice = new Invoice(req.body);
  try {
    const newInvoice = await invoice.save();
    
    // Automatically send email if tracking number is provided
    if (newInvoice.trackingNumber) {
      const shipment = await Shipment.findOne({ trackingNumber: newInvoice.trackingNumber });
      if (shipment) {
        try {
          await sendInvoiceEmail(shipment, {
            amount: newInvoice.amount,
            tax: newInvoice.tax || "0.00",
            total: newInvoice.total
          });
          
          // Log in shipment updates
          shipment.updates.push({
            status: shipment.status,
            location: 'Billing Dept',
            description: `Invoice ${newInvoice.invoiceNumber || ''} for $${newInvoice.total} sent to customer automatically`,
            timestamp: new Date()
          });
          await shipment.save();
        } catch (emailError) {
          console.error('Email error during invoice creation:', emailError.message);
        }
      }
    }
    
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update invoice
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete invoice - Super Admin Only
router.delete('/:id', superAdminAuth, async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
