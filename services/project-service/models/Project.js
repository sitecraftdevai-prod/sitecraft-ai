const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'analyzing', 'developer-assigned', 'completed'], 
    default: 'pending' 
  },
  aiInsightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Insight' }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
