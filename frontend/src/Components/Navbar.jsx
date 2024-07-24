import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <header className='header'>
      <a href="/" className="nav-logo">Logo</a>

      <nav className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/event">Events</Link>
      <Link to="/">Log Out</Link>
      </nav>
    </header>
  )
}

export default Navbar