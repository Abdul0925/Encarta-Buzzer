import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './Admin.css';

const socket = io('http://localhost:4000');

function Admin() {
  const { roomCode } = useParams(); //roomCode from URL
  const audioRef = useRef(null);  //used Audio

  const [users, setUsers] = useState([]);
  const [buzzerOrder, setBuzzerOrder] = useState([]);
  
  // console.log("This Part is Working 1");
  
  useEffect(() => {

    // console.log("This Part is Working 2");
    

    //TO join admin with room 
    socket.emit('joinRoomAdmin', { roomCode });


    //Whenever new user join this code will execute
    socket.on('userJoined', (user) => {
      console.log("Working...");
      console.log(`User joined: ${user}`);
      setUsers((prevUsers) => [...prevUsers, user]);
    });
    
    
    //When user clicks on press buzzer in user page this code will execute 
    socket.on('buzzerResult', (user) => {  
      handlePlaySound();
      console.log("BUZZZZ");
      setBuzzerOrder((prevOrder) => [...prevOrder, user]);
     
    });


    //When admin reset the Buzzer 2
    socket.on('resetBuzzers', () => {
      setBuzzerOrder([]);
    });
    
    
    return () => {
      socket.off('userJoined');
      socket.off('buzzerResult');
      socket.off('resetBuzzers');
    };
  }, [roomCode]);
  
  
  //Function to play audio
  const handlePlaySound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  
  //When admin reset the Buzzer 1
  const handleReset = () => {
    setBuzzerOrder([]);
    socket.emit('resetBuzzers', { roomCode });
  };

  return (
    <div className="admin-container">
      <h2>Room Code: {roomCode}</h2>

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
      <audio ref={audioRef} src= "http://localhost:5173/src/components/damdam.mp3" allow="autoplay"/> 
      <ul>
        {buzzerOrder.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default Admin;
