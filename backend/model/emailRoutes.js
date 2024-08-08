const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'enigmatrooper001@gmail.com',
        pass: '322s4hv6y8'
    }
});

router.post('/send-email', async (req, res) => {
    // Retrieve all user emails from the database
    // This is a placeholder. Replace with actual user retrieval logic.
    const userEmails = ['adevd2004@gmail.com', 'farooqafrina28@gmail.com','akashanil456@gmail.com'];

    const mailOptions = {
        from: 'enigmatrooper001@gmail.com',
        to: userEmails.join(', '),
        subject: 'Predefined Subject',
        text: 'This is a predefined email body'
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

module.exports = router;
