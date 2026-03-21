import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Get all messages (Admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ 
      $or: [{ sender: req.params.userId }, { receiver: req.params.userId }] 
    })
    .populate('sender', 'name email')
    .populate('receiver', 'name email')
    .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create message
router.post('/', async (req, res) => {
  const message = new Message(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
