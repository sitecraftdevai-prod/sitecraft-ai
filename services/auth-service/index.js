const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const passport = require('passport');
require('./passport');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Routes
app.use('/', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Auth service is running' });
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Auth DB Connected'))
  .catch(err => console.error('❌ Auth DB Error:', err));

app.listen(PORT, () => {
  console.log(`🛡️ Auth Service running on port ${PORT}`);
});
