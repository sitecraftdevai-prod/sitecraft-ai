import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5003';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.auth = { userId };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
