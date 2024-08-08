const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const userModel = require('./model/userData');
const EventData = require('./model/eventData');
const RegisterData = require('./model/registerData');
const CommentData = require('./model/commentData');
const LikeDetails = require('./model/likeDetails');
const emailRoutes = require('./model/emailRoutes');
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
            userName,
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
        res.status(200).json({
            message: 'Login successful',
            userName: user.userName,
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

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send(null);
        }

        const registeredCount = await RegisterData.countDocuments({ email });

        // Update the user's registered count if it's different
        if (user.registered !== registeredCount) {
            user.registered = registeredCount;
            await user.save(); // Save the updated user data
        }

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

// Comments
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

// Fetch likes for a specific user
app.get('/api/likes', async (req, res) => {
    try {
        const { email } = req.query;
        const likes = await LikeDetails.find({ email });
        res.json(likes);
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to like an event
app.post('/api/like', async (req, res) => {
    try {
        const like = new LikeDetails(req.body);
        await like.save();
        res.status(201).send('Like saved successfully');
    } catch (error) {
        console.error('Error saving like:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint to unlike an event
app.post('/api/unlike', async (req, res) => {
    const { email, eventName } = req.body;
    try {
        await LikeDetails.findOneAndDelete({ email, eventName });
        res.status(200).json({ message: 'Event unliked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error unliking event' });
    }
});

// Get liked events by user email
app.get('/api/likedEvents', async (req, res) => {
    const { email } = req.query;
    try {
        const likedEvents = await LikeDetails.find({ email });
        res.status(200).json(likedEvents);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching liked events' });
    }
});

// Get like counts for each event
app.get('/api/likeCounts', async (req, res) => {
    try {
        const likeCounts = await LikeDetails.aggregate([
            { $group: { _id: "$eventName", count: { $sum: 1 } } }
        ]);
        const counts = {};
        likeCounts.forEach(item => {
            counts[item._id] = item.count;
        });
        res.json(counts);
    } catch (error) {
        console.error('Error fetching like counts:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Get all users (Admin only)
app.get('/user', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get all events (Admin only)
app.get('/events', async (req, res) => {
    try {
        const events = await eventModel.find({});
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get a user by email
app.get('/user/:email', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Get a event by id
app.get('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        console.log('Fetching event with ID:', eventId);

        if (!eventId || eventId === 'undefined') {
            return res.status(400).send('Invalid event ID');
        }

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).send('Invalid event ID format');
        }

        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Internal Server Error');
    }
});




// Delete a user (Admin only)
app.delete('/api/admin/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        await userModel.deleteOne({ email });
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete an event (Admin only)
app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;

    // Debugging line to verify the ID
    console.log('Event ID for deletion:', id);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
        }

        const result = await eventModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Event not found');
        }
        res.status(200).send('Event deleted successfully');
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Internal Server Error');
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
app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, phoneNumber, address, profilePicture } = req.body;

        const updatedData = { userName, phoneNumber, address };
        if (profilePicture) {
            updatedData.profilePicture = profilePicture;
        }

        const user = await userModel.findByIdAndUpdate(id, updatedData, { new: true });
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

// Update event by ID
app.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { eventName, description, startDate, endDate, timings, days, venue, picture } = req.body;
        // Log incoming data
        console.log('Incoming data:', req.body);
        // Validate the presence of required fields
        if (!eventName || !description || !startDate || !endDate || !timings || !days || !venue) {
            return res.status(400).send('Required fields are missing');
        }
        // Prepare the update object
        const updatedEvent = {
            eventName,
            description,
            startDate,
            endDate,
            timings,
            days,
            venue
        };
        // Include optional picture field if provided
        if (picture) {
            updatedEvent.picture = picture;
        }
        // Find event by ID and update
        const event = await eventModel.findByIdAndUpdate(id, updatedEvent, { new: true });
        if (!event) {
            return res.status(404).send('Event not found');
        }
        console.log('Event updated successfully:', updatedEvent);
        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send('Internal Server Error');
    }
});




app.listen(PORT, () => {
    console.log("Server is running on PORT 4000");
});
