const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const userModel = require('./model/userData');
const EventData = require('./model/eventData');
const RegisterData = require('./model/registerData');
const CommentData = require('./model/commentData');
require('./connection');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // form data handle

// Check if email already exists
app.get('/check-email', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).send('Email is required');
        }

        const existingUser = await userModel.findOne({ email });
        res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Signup
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

        // Create a new user
        const newUser = new userModel({
            userName, // Ensure userName is set correctly
            email,
            phoneNumber,
            address,
            password
        });

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
        // Include the user's username in the response
        res.status(200).json({
            message: 'Login successful',
            userName: user.userName,  // Add this line to include username
            isAdmin: user.userName.toLowerCase() === 'admin'
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Profile Fetch with Registered Events Count
app.get('/user/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Find user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send(null);
        }

        // Count registered events for the user
        const registeredCount = await RegisterData.countDocuments({ email });

        // Update the user's registered count if it's different
        if (user.registered !== registeredCount) {
            user.registered = registeredCount;
            await user.save(); // Save the updated user data
        }

        // Send the user data with the registered count
        res.status(200).json({ ...user.toObject(), registered: registeredCount });
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

app.get('/api/events', async (req, res) => {
    try {
      const events = await EventData.find();
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await EventData.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get event by ID
app.get('/api/events/:eventId', async (req, res) => {
    try {
      const event = await EventData.findById(req.params.eventId);
      if (!event) {
        return res.status(404).send('Event not found');
      }
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone, eventName } = req.body;

        // Check for empty fields
        if (!name || !email || !phone || !eventName) {
            return res.status(400).send('All fields are required');
        }

        const newEventData = new RegisterData({ name, email, phone, eventName });
        await newEventData.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).send('Error registering for event');
    }
});
  

// New endpoint to get the number of registered events for a user
app.get('/api/user-registrations/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const count = await RegisterData.countDocuments({ email });
        res.status(200).json({ registeredEventsCount: count });
    } catch (error) {
        console.error('Error fetching registered events count:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//comments
app.post('/api/comments', async (req, res) => {
    try {
        const { eventName, userName, comments } = req.body;

        // Check for empty fields
        if (!eventName || !userName || !comments) {
            return res.status(400).send('All fields are required');
        }

        const newComment = new CommentData({ eventName, userName, comments });
        await newComment.save();
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Error adding comment');
    }
});

app.get('/api/comments', async (req, res) => {
    try {
        const { eventName } = req.query;
        const comments = await CommentData.find({ eventName });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log("Server is running on PORT 4000");
});
