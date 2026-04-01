const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const Message = require('./models/Message');
const chatRoutes = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict to Frontend URL
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/', chatRoutes);

// Socket.io Logic
io.on('connection', (socket) => {
  console.log('User Connected:', socket.id);

  socket.on('joinRoom', (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined room: ${projectId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { projectId, senderId, senderName, text } = data;
    
    try {
      const newMessage = new Message({
        roomId: projectId,
        senderId,
        senderName,
        text
      });
      await newMessage.save();

      // Broadcast to room
      io.to(projectId).emit('receiveMessage', newMessage);
    } catch (err) {
      console.error('Socket Error:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected:', socket.id);
  });
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Chat DB Connected'))
  .catch(err => console.error('❌ Chat DB Error:', err));

server.listen(PORT, () => {
  console.log(`💬 Chat Service running on port ${PORT}`);
});
