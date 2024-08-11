import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const generatedCode = Math.random().toString(36).substring(2, 8);
    setRoomCode(generatedCode);
    navigate(`/room/${generatedCode}`);
  };

  return (
    <div className="create-room-container">
      <button onClick={handleCreateRoom} className="create-room-button">
        Create Room
      </button>
      {roomCode && <p>Room Code: {roomCode}</p>}
    </div>
  );
}

export default CreateRoom;
