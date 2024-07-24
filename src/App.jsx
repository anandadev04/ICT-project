import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup';
import Home from './Components/Home';
import Profile from './Components/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </Router>
  );
}

export default App;