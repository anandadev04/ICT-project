import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup';
import Home from './Components/Home';
import Profile from './Components/Profile'
import EventList from './Components/EventList'
import Register from './Components/Register'
import Eventdetails from './Components/Eventdetails';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/event" element={<EventList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/eventdetails/:eventId" element={<Eventdetails />} />
        <Route path="/regback" element={<Eventdetails />}/>
      </Routes>
    </Router>
  );
}

export default App;