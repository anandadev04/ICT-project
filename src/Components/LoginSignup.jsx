import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import email_icon from '../assets/email.png';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign up");
  const navigate = useNavigate();

  const handleAction = () => {
    if (action === "Login") {
      // Handle Sign In
      console.log("User signed in");
      navigate('/home'); // Redirect to the home page
    } else {
      // Handle Sign Up
      console.log("User signed up");
      // Add sign-up logic here
    }
  };

  return (
    <div className="container">
      <div className="login-header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign up" && (
          <div className="input">
            <img src={user_icon} className="icon" alt="" />
            <input type="text" placeholder='Name' />
          </div>
        )}
        <div className="input">
          <img src={email_icon} className="icon" alt="" />
          <input type="email" placeholder='Email Id' />
        </div>
        <div className="input">
          <img src={password_icon} className="icon" alt="" />
          <input type="password" placeholder='Password' />
        </div>
      </div>
      {action === "Login" && (
        <div className="forgot-password">Lost Password?<span>Click Here</span></div>
      )}
      <div className="submit-container">
        <div className="submit" onClick={handleAction}>
          {action === "Login" ? "Sign In" : "Sign Up"}
        </div>
        {/* Toggle Buttons */}
        {action === "Sign up" && (
          <div className="toggle" onClick={() => setAction("Login")}>Login</div>
        )}
        {action === "Login" && (
          <div className="toggle" onClick={() => setAction("Sign up")}>Sign Up</div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
