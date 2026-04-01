const express = require('express');
const router = express.Router();
const Insight = require('../models/Insight');

// Simple AI logic engine
const analyzeReqs = (description) => {
  const desc = description.toLowerCase();
  let techStack = ['Node.js', 'React', 'MongoDB'];
  let timeline = '2-4 weeks';

  if (desc.includes('ecommerce') || desc.includes('shop')) {
    techStack.push('Stripe', 'Redux');
    timeline = '6-8 weeks';
  } else if (desc.includes('social') || desc.includes('chat')) {
    techStack.push('Socket.io', 'Redis');
    timeline = '4-6 weeks';
  } else if (desc.includes('dashboard') || desc.includes('admin')) {
    techStack.push('Chart.js', 'Tailwind CSS');
    timeline = '3-5 weeks';
  }

  return { techStack, timeline };
};

// Analyze project requirements
router.post('/analyze', async (req, res) => {
  try {
    const { projectId, description } = req.body;
    
    // Perform simulated AI analysis
    const { techStack, timeline } = analyzeReqs(description);

    const insight = new Insight({
      projectId,
      techStack,
      estimatedTimeline: timeline,
      analysisSummary: `Based on your requirements, we recommend a ${techStack.join(', ')} stack. Estimated delivery: ${timeline}.`
    });

    await insight.save();
    res.status(201).json(insight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get insight for a project
router.get('/:projectId', async (req, res) => {
  try {
    const insight = await Insight.findOne({ projectId: req.params.projectId });
    if (!insight) return res.status(404).json({ message: 'No insights found for this project' });
    res.json(insight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
