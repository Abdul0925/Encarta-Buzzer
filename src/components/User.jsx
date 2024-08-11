import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './User.css';
import { useLocation  } from 'react-router-dom';



const socket = io('http://localhost:4000');

function User() {
  const { roomCode } = useParams();
  const [pressed, setPressed] = useState(false);
  const [firstResponder, setFirstResponder] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const location = useLocation();
  const { key } = location.state || {};
  
  useEffect(() => {
    console.log("Hello1");
    const userId = `user${Math.floor(Math.random() * 1000)}`; // Generate a random user ID
    // socket.on('userJoined', (userId) => {
      console.log("Hello2");
      setUserName(userId);
    // });

    socket.emit('joinRoom', { roomCode, userId });
    
    
   
    socket.on('buzzerResult', (data) => {
      setFirstResponder(data.userId);
    });

    return () => {
      socket.off('userJoined');
      socket.off('buzzerResult');
    };
  }, [roomCode]);

  const handleBuzzerPress = () => {
    if (!pressed) {
      // if (audio) {
      //   audio.play().catch((error) => {
      //     console.error("Error playing audio:", error);
      //   });
      // }
      console.log("Pressed")
      
      socket.emit('buzzerPress', { roomCode, userId:userName });
      // socket.emit('buzzerPress', { roomCode });
      setPressed(true);

    }
  };

  return (
    <div className="user-container">
      <h2>{userName}</h2>
      {/* <h2>{key.userId}</h2> */}
      {/* <input
        type="text"
        value={key.userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder={key.userId}
        className="username-input"
      /> */}
      {/* <h2>{userId}</h2> */}
      <button className="buzzer-button" onClick={handleBuzzerPress} disabled={pressed}>
        Press Buzzer
      </button>
      {/* <audio id="audioElement" src=".\chin tapak dam dam.mp3"></audio> */}
      <audio>
        <source src="./damdam.mp3" />
        Your browser does not support the audio element.
      </audio>
      {firstResponder && (
        <div className="result">
          {/* {firstResponder === userName ? 'You pressed first!' : `${firstResponder} pressed first!`} */}
          {firstResponder === userName ? 'You pressed first!' : `${firstResponder} pressed first!`}
        </div>
      )}
    </div>
  );
}

export default User;

