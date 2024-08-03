import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventName } = location.state || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSub = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      eventName,
    };

    console.log('Registering with data:', data); // Debugging log

    axios.post('http://localhost:4000/api/register', data)
      .then((response) => {
        console.log('Registration successful:', response.data);
        navigate('/regback'); 
      })
      .catch((error) => {
        console.error('Error registering:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="register-container-wrapper">
      <div className="register-container">
        <Paper
          sx={{ backgroundColor: 'black' }} // Ensure the background color is applied correctly
          className="register-paper"
          elevation={3}
        >
          <Typography className="register-typography" component="h1" variant="h5" align="center">
            Register
          </Typography>
          <form className="register-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    className="register-input"
                    variant="outlined"
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="register-input"
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="register-input"
                  variant="outlined"
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: '1rem',
                borderRadius: '8px',
                padding: '0.75rem',
                backgroundColor: '#fff', // White background for the button
                color: '#000', // Black text on the button for contrast
                border: '1px solid #ccc', // Light grey border
                transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s', // Smooth transition
                '&:hover': {
                  backgroundColor: '#f8f9fa', // Slightly off-white background on hover
                  color: '#000', // Black text remains visible on hover
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
              onClick={handleRegisterSub}
            >
              Register
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default Register;
