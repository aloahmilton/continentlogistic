import express from 'express';
import Setting from '../models/Setting.js';
import { superAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get settings by key
router.get('/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) return res.status(404).json({ message: 'Setting not found' });
    res.json(setting.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update or create setting (Super Admin Only)
router.post('/:key', superAdminAuth, async (req, res) => {
  try {
    const { key } = req.params;
    const value = req.body;
    
    let setting = await Setting.findOne({ key });
    
    if (setting) {
      setting.value = value;
    } else {
      setting = new Setting({ key, value });
    }
    
    await setting.save();
    res.json(setting.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
