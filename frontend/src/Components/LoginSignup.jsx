import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import email_icon from '../assets/email.png';
import contact_icon from '../assets/phone-solid (1).png';
import house_icon from '../assets/house-solid.png';

const LoginSignup = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: ''
  });
  const [action, setAction] = useState('Login');
  const navigate = useNavigate();

  const valueFetch = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAction = () => {
    if (action === 'Login') {
        axios.post('http://localhost:4000/login', {
            email: form.email,
            password: form.password
        })
        .then((res) => {
            console.log('User signed in successfully');
            localStorage.setItem('userEmail', form.email);
            if (res.data.isAdmin) {
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
        })
        .catch((error) => {
            console.error('Error signing in:', error);
            alert('Failed to sign in: ' + error.response.data);
        });
    } else {
        const userData = {
            userName: form.userName,
            email: form.email,
            phoneNumber: form.phoneNumber,
            address: form.address,
            password: form.password,
            profilePicture: ''
        };

        axios.post('http://localhost:4000/newuser', userData)
            .then((res) => {
                alert('User signed up successfully');
                setAction('Login');
                console.log(res);
            })
            .catch((error) => {
                console.error('There was an error signing up!', error);
            });
    }
};

  

  return (
    <div className="container">
      <div className="login-header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === 'Sign up' && (
          <div className="input">
            <img src={user_icon} className="icon" alt="" />
            <input type="text" name="userName" placeholder="Name" onChange={valueFetch} value={form.name} />
          </div>
        )}
        <div className="input">
          <img src={email_icon} className="icon" alt="" />
          <input type="email" name="email" placeholder="Email Id" onChange={valueFetch} value={form.email} />
        </div>
        {action === 'Sign up' && (
          <div className="input">
            <img src={contact_icon} className="icon" alt="" />
            <input type="text" name="phoneNumber" placeholder="Contact Number" onChange={valueFetch} value={form.contactNumber} />
          </div>
        )}
        {action === 'Sign up' && (
          <div className="input">
            <img src={house_icon} className="icon" alt="" />
            <input type="text" name="address" placeholder="Address" onChange={valueFetch} value={form.address} />
          </div>
        )}
        <div className="input">
          <img src={password_icon} className="icon" alt="" />
          <input type="password" name="password" placeholder="Password" onChange={valueFetch} value={form.password} />
        </div>
      </div>
      {action === 'Login' && (
        <div className="forgot-password">Lost Password?<span>Click Here</span></div>
      )}
      <div className="submit-container">
        <div className="submit" onClick={handleAction}>
          {action === 'Login' ? 'Sign In' : 'Sign Up'}
        </div>
        {/* Toggle Buttons */}
        {action === 'Sign up' && (
          <div className="toggle" onClick={() => setAction('Login')}>Login</div>
        )}
        {action === 'Login' && (
          <div className="toggle" onClick={() => setAction('Sign up')}>Sign Up</div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
