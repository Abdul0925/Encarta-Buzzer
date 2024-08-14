import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkRoomCode } from '../utils/checkRoomCode';
import io from 'socket.io-client';
import './JoinRoom.css';


const socket = io('http://localhost:4000');


function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');  // if use username  

  const navigate = useNavigate();

  const handleJoinRoom = () => {
    const userId = `User${Math.floor(Math.random() * 1000)}`;
    // socket.emit('joinRoom', { roomCode, userId });
    socket.emit('joinRoom', { roomCode, userName });

    if (roomCode ) {
      checkRoomCode(roomCode).then((isValid) => {
      if (isValid) {
        
        // navigate(`/room/${userId}/${roomCode}` );
        navigate(`/room/${userName}/${roomCode}` );
      } else {
        alert('Invalid Room Code');
      }
    });

      
    }
  };
 
  return (
    <div className="join-room-container">
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter Your Name"
        className="join-room-input"
      />
      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Enter Room Code"
        className="join-room-input"
      />
      <button onClick={handleJoinRoom} className="join-room-button">
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;

