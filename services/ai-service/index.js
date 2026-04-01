const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', aiRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ AI DB Connected'))
  .catch(err => console.error('❌ AI DB Error:', err));

app.listen(PORT, () => {
  console.log(`🤖 AI Service running on port ${PORT}`);
});
