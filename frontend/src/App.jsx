import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup';
import Home from './Components/Home';
import Profile from './Components/Profile';
import EventList from './Components/EventList';
import Register from './Components/Register';
import Eventdetails from './Components/Eventdetails';
import TermsAndConditions from './Components/Termsandconditions'; // Import the component

const NotFound = () => {
  return <h2>404 - Page Not Found</h2>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event" element={<EventList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/eventdetails/:eventId" element={<Eventdetails />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> {/* New route */}
        <Route path="/regback" element={<EventList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
