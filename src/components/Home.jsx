import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import io from 'socket.io-client';


const socket = io('http://localhost:4000');
function Home() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    socket.emit('createRoom'); //RoomCode Created
    // Navigate to New URL with Room Code =>
    socket.on('roomCreated', ({ roomCode }) => {
      navigate(`/admin/${roomCode}`);
    });
  };
  const handleJoinRoom = () => {
    navigate('/join');
  };
  return (
    <div className="home-container">
      <button onClick={handleCreateRoom} className="home-button">
        Create Room
      </button>
      <button onClick={handleJoinRoom} className="home-button">
        Join Room
      </button>
    </div>
  );
}

export default Home;
