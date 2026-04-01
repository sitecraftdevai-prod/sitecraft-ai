const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');

// Middleware to verify JWT and attach user info
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  });
};

// Create a new project
router.post('/create', authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newProject = new Project({
      title,
      description,
      clientId: req.user.id
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects (Admin) or Client's projects
router.get('/list', authenticate, async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { clientId: req.user.id };
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project status (Admin only)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update status' });
    }
    const { status } = req.body;
    const project = await Project.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
