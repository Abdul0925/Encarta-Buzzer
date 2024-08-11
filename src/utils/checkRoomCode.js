import axios from 'axios';

export const checkRoomCode = (roomCode) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:4000/check-room/${roomCode}`)
      .then(response => {
        if (response.status === 200 && response.data.exists) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
