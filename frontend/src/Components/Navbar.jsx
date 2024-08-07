import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path to your logo image

const Navbar = () => {
  return (
    <header className='header'>
      <a href="" className="nav-logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </a>

      <nav className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/event">Events</Link>
        <Link to="/">Log Out</Link>
      </nav>
    </header>
  );
};

export default Navbar;