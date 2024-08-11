import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkRoomCode } from '../utils/checkRoomCode';
import io from 'socket.io-client';
import './JoinRoom.css';


const socket = io('http://localhost:4000');


function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');
  // const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  // const handleJoinRoom = () => {
  //   // Check if the room code is valid
  //   // Assuming we have a function checkRoomCode that returns a promise

  //   checkRoomCode(roomCode).then((isValid) => {
  //     if (isValid) {
  //       navigate(`/room/${roomCode}`);
  //     } else {
  //       alert('Invalid Room Code');
  //     }
  //   });
  // };
  const handleJoinRoom = () => {
    // const userId = `User${Math.floor(Math.random() * 1000)}`;
    // socket.emit('joinRoom', { roomCode, userId });
    if (roomCode) {

         checkRoomCode(roomCode).then((isValid) => {
      if (isValid) {
        // navigate(`/room/${roomCode}`, { state: { key: {userId} } });
        navigate(`/room/${roomCode}` );
      } else {
        alert('Invalid Room Code');
      }
    });

      // socket.on('connect', () => {
      //   navigate(`/room/${roomCode}`);
      // });
    // } else {
      // alert('Please enter a room code.');
    }
  };
  return (
    <div className="join-room-container">
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



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { checkRoomCode } from '../utils/checkRoomCode';
// import io from 'socket.io-client';
// import './JoinRoom.css';

// const socket = io('http://localhost:4000');

// const JoinRoom = () => {
//   const [roomCode, setRoomCode] = useState('');
//   const [userName, setUserName] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleJoinRoom = async () => {
//     try {
//       const exists = await checkRoomCode(roomCode);
//       if (exists) {
//         const userId = userName || `User${Math.floor(Math.random() * 1000)}`;
//         socket.emit('joinRoom', { roomCode, userId });
//         navigate(`/room/${roomCode}`);
//       } else {
//         setError('Invalid Room Code');
//       }
//     } catch (error) {
//       console.error('Error checking room code:', error);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="join-room-container">
//       <h2>Join a Room</h2>
//       <input
//         type="text"
//         value={roomCode}
//         onChange={(e) => setRoomCode(e.target.value)}
//         placeholder="Enter Room Code"
//       />
//       <input
//         type="text"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//         placeholder="Enter Your Name"
//       />
//       <button onClick={handleJoinRoom}>Join Room</button>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default JoinRoom;
