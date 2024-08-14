import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './User.css';
import { useLocation  } from 'react-router-dom';



const socket = io('http://localhost:4000');

function User() {
  const { roomCode } = useParams();
  const { userId } = useParams();
  const [pressed, setPressed] = useState(false);
  const [firstResponder, setFirstResponder] = useState(null);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const { key } = location.state || {};

 
  
  useEffect(() => {

    // socket.emit('joinRoom', { roomCode, userId });
    //The following socket is not working
    socket.on('buzzerResult', (data) => {
      console.log("Buzzer Result");
      setFirstResponder(data);
    });


    return () => {
      socket.off('buzzerResult');
    };
  }, [roomCode]);

  const handleBuzzerPress = () => {
    if (!pressed) {
      console.log("Buzzer Pressed");
      socket.emit('buzzerPress', { roomCode, userId }); //Go To server
      setPressed(true);
    }
  };

  
  return (
    <div className="user-container">
      <h1>You Joined: <u>{roomCode}</u> </h1>
      
      <h2>{userId}</h2>
      
      <button className="buzzer-button" onClick={handleBuzzerPress} disabled={pressed}>
        Press Buzzer
      </button>
      
      {/* The following code is not working */}
      {firstResponder && (
        <div className="result">
          {firstResponder === userId ? 'You pressed first!' : `${firstResponder} pressed first!`}
        </div>
      )}
    </div>
  );
}

export default User;

