import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './Admin.css';

const socket = io('http://localhost:4000');

function Admin() {
  const { roomCode } = useParams();
  

  // const [roomCode, setRoomCode] = useState('');
  const [users, setUsers] = useState([]);
  const [buzzerOrder, setBuzzerOrder] = useState([]);
  
  console.log("Hello1");
  useEffect(() => {
    console.log("Hello2");

    socket.on('userJoined', (user) => {
      console.log("Hello3");
      console.log(`User joined: ${user}`);
      // setUsers(user);
      // console.log(`Current users in room ${roomCode}: ${roomCode.users.join(', ')}`);
      setUsers((prevUsers) => [...prevUsers, user]);
      // setUsers({userId});
    });
    
    socket.emit('joinRoomAdmin', { roomCode });

    socket.on('buzzerResult', (user) => {
      setBuzzerOrder((prevOrder) => [...prevOrder, user]);
    });
    socket.on('resetBuzzers', () => {
      setBuzzerOrder([]);
    });
    return () => {
      socket.off('userJoined');
      socket.off('buzzerResult');
      socket.off('resetBuzzers');
    };
  }, [roomCode]);

  const handleReset = () => {
    setBuzzerOrder([]);
    socket.emit('resetBuzzers', { roomCode });
  };

  return (
    <div className="admin-container">
      <h2>Room Code: {roomCode}</h2>
      {/* <h2>Room Code: ':roomCode'</h2> */}
      <button onClick={handleReset} className="reset-button">
        Reset Buzzers
      </button>
      <h3>Connected Users:</h3>
  
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>

      <h3>Buzzer Order:</h3>
      <ul>
        {buzzerOrder.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
