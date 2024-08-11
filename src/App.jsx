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
          <h1>Encarta Quiz Buzzer</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact>
              {/* <Home /> */}
            </Route>
            <Route path="/admin/:roomCode" element={<Admin />}>
              {/* <Admin /> */}
            </Route>
            <Route path="/join" element={<JoinRoom />}>
              {/* <JoinRoom /> */}
            </Route>
            <Route path="/room/:userId/:roomCode" element={<User />}>
              {/* <User /> */}
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
