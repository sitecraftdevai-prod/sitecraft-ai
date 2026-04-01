const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
  techStack: [{ type: String }],
  estimatedTimeline: { type: String },
  analysisSummary: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Insight', InsightSchema);
