import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  });

const rooms = {};

function generateRoomCode() {
  const generatedRoomCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    // console.log(generatedRoomCode);
    return generatedRoomCode;
  }

app.use(cors({
    origin: "*",
}))

io.on('connection', (socket) => {


  //When User Clicks on Create Room This code will run
  //START
  socket.on('createRoom', () => {
    const roomCode = generateRoomCode();
    rooms[roomCode] = { users: [], buzzerOrder: [] };
    
    console.log(`Room ${roomCode} created`);
    socket.emit('roomCreated', { roomCode }); //Go To Home Page
  });
  //END
  
  //When User Clicks on Join room after putting RoomCode
  //START
  socket.on('joinRoom', ({ roomCode, userId }) => {
    if (rooms[roomCode]) {
      rooms[roomCode].users.push(userId); //UserId added (push) to an array
      socket.join(roomCode);
      socket.broadcast.to(roomCode).emit('userJoined', userId); //Send userId to Admin because we use userJoined in admin page
      console.log(`${userId} joined room ${roomCode}`);
      console.log(`Current users in room ${roomCode}: ${rooms[roomCode].users.join(', ')}`);
    } else {
      socket.emit('invalidRoom');
    }
  });
  //END



  //This socket is called from Admin page
  //START
  socket.on('joinRoomAdmin', ({ roomCode }) => {
    // console.log(`Admin joined room: ${roomCode}`);
    socket.join(roomCode);
  });
  //END
  
  
  //When user clicks on buzzer 
  //START
  socket.on('buzzerPress', ({ roomCode, userId }) => {
    if (rooms[roomCode] && !rooms[roomCode].buzzerOrder.includes(userId)) {
      rooms[roomCode].buzzerOrder.push(userId);
      socket.broadcast.to(roomCode).emit('buzzerResult', userId); //userId will send to Admin Page
      console.log(`${userId} pressed the buzzer in room ${roomCode}`);
    }
  });
  //END

  //When admin clicks on reset button this code will work
  //START
  socket.on('resetBuzzers', ({ roomCode }) => {
    if (rooms[roomCode]) {
      rooms[roomCode].buzzerOrder = [];
      io.to(roomCode).emit('resetBuzzers');  //Working on it
      console.log(`Buzzers reset in room ${roomCode}`);
    }
  });
  //END
  


  //when checkRoomCode.js is called 
  //START
  app.get('/check-room/:roomCode', (req, res) => {
    const { roomCode } = req.params;
    if (rooms[roomCode]) {
      res.status(200).send({ exists: true });
    } else {
      res.status(404).send({ exists: false });
    }
  });
  //END 

  socket.on('disconnect', () => {
    // console.log('Client disconnected');
  });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
