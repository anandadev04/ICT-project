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
<<<<<<< HEAD
        <Route path="/eventdetails" element={<Eventdetails />} />
        <Route path="/regback" element={<EventList />}/>
=======
        <Route path="/eventdetails/:eventId" element={<Eventdetails />} />
        <Route path="/regback" element={<Eventdetails />}/>
>>>>>>> b4d554ef0227db238793fa903cb9f4ecd589c479
      </Routes>
    </Router>
  );
}

export default App;