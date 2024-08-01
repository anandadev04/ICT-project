import React from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate();
  const handleRegisterSub = () => {
    navigate('/regback'); 
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
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="register-input"
                variant="outlined"
                required
                fullWidth
                label="Phone Number"
                type="tel"
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


