const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const userModel = require('./model/userData');
require('./connection');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // form data handle

// Signup
app.post('/newuser', async (req, res) => {
    try {
        const { userName, email, phoneNumber, address, password } = req.body;

        // Check for empty fields
        if (!userName || !email || !phoneNumber || !address || !password) {
            return res.status(400).send('All fields are required');
        }

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send('Email already exists');
        }

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send('User signed up successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (user.password !== password) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).json({
            message: 'Login successful',
            isAdmin: user.userName.toLowerCase() === 'admin'
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Profile Fetch
app.get('/user/:email', async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.params.email });
      if (!user) {
        return res.status(404).send(null);
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

// Update User
app.put('/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { userName, phoneNumber, address, profilePicture } = req.body;

        const updatedData = { userName, email, phoneNumber, address };
        if (profilePicture) {
            updatedData.profilePicture = profilePicture; 
        }

        const user = await userModel.findOneAndUpdate({ email }, updatedData, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }

        console.log('User updated successfully:', updatedData);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log("Server is running on PORT 4000");
});
