const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const projectRoutes = require('./routes/project');
const syncRoutes = require('./routes/sync');

const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/', projectRoutes);
app.use('/team', teamRoutes);
app.use('/api', syncRoutes);

// Seeding team members if empty
const TeamMember = require('./models/TeamMember');
const seedTeam = async () => {
  try {
    const count = await TeamMember.countDocuments();
    if (count === 0) {
      const staticTeam = [
        { name: 'Sarah Johnson', role: 'Creative Director', description: 'Leading creative vision with a focus on fresh, innovative brand development.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop', linkedinUrl: '#', order: 1 },
        { name: 'Michael Chen', role: 'Lead Developer', description: 'Full-stack developer specializing in modern web technologies and scalable solutions.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop', linkedinUrl: '#', order: 2 },
        { name: 'Emma Davis', role: 'UI/UX Designer', description: 'Crafting intuitive user experiences with a focus on accessibility and usability.', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2000&auto=format&fit=crop', linkedinUrl: '#', order: 3 }
      ];
      await TeamMember.insertMany(staticTeam);
      console.log('🌱 Team database seeded with masters');
    }
  } catch (err) {
    console.error('❌ Seeding Error:', err);
  }
};

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Project DB Connected');
    seedTeam();
  })
  .catch(err => console.error('❌ Project DB Error:', err));

app.listen(PORT, () => {
  console.log(`📝 Project Service running on port ${PORT}`);
});
