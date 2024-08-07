import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
}));

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleCardClick = (eventId) => {
    navigate(`/eventdetails/${eventId}`);
  };

  const getFirstSentence = (text) => {
    const sentenceEnd = /[.!?]/;
    const firstSentence = text.split(sentenceEnd)[0].trim();
    return firstSentence + (firstSentence ? '.' : ''); // Add period if there was text
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="banner-container">
          <img 
            src="/src/assets/wall3.jpg" 
            alt="Banner" 
            className="banner-image" 
          />
          <img 
            src="/src/assets/logo.png" 
            alt="Overlay" 
            className="overlay-image" 
          />
        </div>
        
        <h1 className="heading">About Us</h1>
        <div style={{ paddingLeft: "18%", paddingRight: "18%" }}>
          <p style={{ color: 'black', textAlign: 'center' }}>
            Welcome to [Your Company Name] – your go-to destination for discovering and registering for the latest and most exciting events!
            We are dedicated to bringing you a diverse range of events that cater to every interest and occasion, ensuring you never miss out on an opportunity to connect, celebrate, and experience something new.
            Our platform offers a seamless way to explore upcoming events, from community gatherings and professional workshops to concerts and social mixers. Here’s what we offer:
            EventListings: Browse through a comprehensive list of upcoming events tailored to your interests. Each event page provides detailed information, including dates, locations, schedules, and more.
            Event Details: Get all the essential information you need to make informed decisions about the events you want to attend.
            Easy Registration: Secure your spot with our user-friendly registration process. Sign up and pay for tickets directly through our platform for a hassle-free experience.
            At [Your Company Name], we are passionate about helping you stay engaged and make the most out of every event. Whether you’re looking to attend a local festival, a professional seminar, or an exclusive networking event, we’ve got you covered.

            Explore our event calendar today and be part of the exciting experiences waiting for you!
          </p>
        </div>
        
        <div className="cards-container">
          {events.map((event) => (
            <Card key={event._id} sx={{ maxWidth: 320, overflow: 'hidden', backgroundColor: '#333', color: 'white' }}>
              <CardActionArea onClick={() => handleCardClick(event._id)}>
                <StyledCardMedia
                  component="img"
                  height="250"
                  image={`data:image/png;base64,${event.picture}`}
                  alt={event.eventName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="white">
                    {event.eventName}
                  </Typography>
                  <Typography variant="body2" color="white">
                    Start Date: {formatDate(event.startDate)}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {getFirstSentence(event.description)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
