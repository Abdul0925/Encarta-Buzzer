import React from 'react';
import { BrowserRouter, Router, Route, Routes, } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Admin from './components/Admin';
import JoinRoom from './components/JoinRoom';
import User from './components/User';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>ENCARTA Quiz Buzzer</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact></Route>
            <Route path="/admin/:roomCode" element={<Admin />}></Route>
            <Route path="/join" element={<JoinRoom />}></Route>
            {/* <Route path="/room/:userId/:roomCode" element={<User />}></Route> */}
            <Route path="/room/:userName/:roomCode" element={<User />}></Route>
          </Routes>
        </main>
        <footer className='footer'>
          <b><i>Developed by: ABDUL RAHIM</i></b>
      </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
