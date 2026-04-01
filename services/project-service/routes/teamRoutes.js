const router = require('express').Router();
const TeamMember = require('../models/TeamMember');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/team/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `team-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Upload Endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${req.protocol}://${req.get('host')}/uploads/team/${req.file.filename}`;
  res.json({ imageUrl: url });
});

// Get all team members
router.get('/list', async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ order: 1, createdAt: -1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new team member (Admin only)
router.post('/add', async (req, res) => {
  try {
    const newMember = new TeamMember({
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      linkedinUrl: req.body.linkedinUrl,
      imageUrl: req.body.imageUrl,
      order: req.body.order
    });
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update team member (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete team member (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
