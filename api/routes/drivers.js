import express from 'express';
import Driver from '../models/Driver.js';

const router = express.Router();

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create driver
router.post('/', async (req, res) => {
  const driver = new Driver(req.body);
  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update driver
router.put('/:id', async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete driver
router.delete('/:id', async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
