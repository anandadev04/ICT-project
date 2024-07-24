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
        <a href="">Events</a>
      <Link to="/">Log Out</Link>
      </nav>
    </header>
  )
}

export default Navbar