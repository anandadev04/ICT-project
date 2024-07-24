// src/components/Register.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Register.css'; // Ensure you have a CSS file for styling
import Navbar from './Navbar';
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event; // Get event data from state

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., send data to server)
    console.log({ name, email, contactNumber, event });
    navigate('/'); // Redirect to homepage after registration
  };

  return (
    <div className="register">
      <Navbar/>
      <br/>
      <h1>Register for {event?.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
