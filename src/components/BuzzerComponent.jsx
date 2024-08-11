import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './BuzzerComponent.css';

const socket = io('http://localhost:4000'); // Replace with your backend URL

function BuzzerComponent() {
  const [pressed, setPressed] = useState(false);
  const [firstResponder, setFirstResponder] = useState(null);

  const handleBuzzerPress = () => {
    if (!pressed) {
      socket.emit('buzzerPress', { userId: 'user123' }); // Replace with dynamic userId
      setPressed(true);
    }
  };

  useEffect(() => {
    socket.on('buzzerResult', (data) => {
      setFirstResponder(data.userId);
    });

    return () => {
      socket.off('buzzerResult');
    };
  }, []);

  return (
    <div className="buzzer-container">
      <button className="buzzer-button" onClick={handleBuzzerPress} disabled={pressed}>
        Press Buzzer
      </button>
      {firstResponder && (
        <div className="result">
          {firstResponder === 'user123' ? 'You pressed first!' : `${firstResponder} pressed first!`}
        </div>
      )}
    </div>
  );
}

export default BuzzerComponent;
