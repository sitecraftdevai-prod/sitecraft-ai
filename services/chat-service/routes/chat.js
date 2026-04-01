const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get history for a specific project room
router.get('/history/:projectId', async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.projectId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
