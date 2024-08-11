import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  });
// const cors = require("cors")

const rooms = {};

function generateRoomCode() {
    console.log(Math.random().toString(36).substr(2, 6).toUpperCase());
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }

app.use(cors({
    origin: "*",
}))

io.on('connection', (socket) => {
  // console.log('New client connected');

  socket.on('createRoom', () => {
    const roomCode = generateRoomCode();
    rooms[roomCode] = { users: [], buzzerOrder: [] };
    
    socket.emit('roomCreated', { roomCode });
    console.log(`Room ${roomCode} created`);
  });


  socket.on('joinRoom', ({ roomCode, userId }) => {
    if (rooms[roomCode]) {
      rooms[roomCode].users.push(userId);
      socket.join(roomCode);
      // io.to(roomCode).emit('userJoined', userId);
      // socket.emit('userJoined', userId);
      socket.broadcast.to(roomCode).emit('userJoined', userId);
      console.log(`${userId} joined room ${roomCode}`);
      console.log(`Current users in room ${roomCode}: ${rooms[roomCode].users.join(', ')}`);
   
    } else {
      socket.emit('invalidRoom');
    }
  });
 

  socket.on('joinRoomAdmin', ({ roomCode }) => {
    // console.log(`Admin joined room: ${roomCode}`);
    socket.join(roomCode);
  });
  // socket.on('joinRoomUser', ({ roomCode }) => {
  //   // console.log(`Admin joined room: ${roomCode}`);
  //   socket.join(roomCode);
  // });
  
  
  
  socket.on('buzzerPress', ({ roomCode, userId }) => {
    if (rooms[roomCode] && !rooms[roomCode].buzzerOrder.includes(userId)) {
      rooms[roomCode].buzzerOrder.push(userId);
      // io.to(roomCode).emit('buzzerResult', { userId });
      socket.broadcast.to(roomCode).emit('buzzerResult', userId);
      console.log(`${userId} pressed the buzzer in room ${roomCode}`);
    }
  });


  socket.on('resetBuzzers', ({ roomCode }) => {
    if (rooms[roomCode]) {
      rooms[roomCode].buzzerOrder = [];
      io.to(roomCode).emit('resetBuzzers');
      console.log(`Buzzers reset in room ${roomCode}`);
    }
  });

  app.get('/check-room/:roomCode', (req, res) => {
    const { roomCode } = req.params;
    if (rooms[roomCode]) {
      res.status(200).send({ exists: true });
    } else {
      res.status(404).send({ exists: false });
    }
  });

  socket.on('disconnect', () => {
    // console.log('Client disconnected');
  });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
