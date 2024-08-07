import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';

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
    <div className="home-container">
      <Navbar />
      <div className="navbar-container">
        <div className="banner-container">
          <img 
            src="/src/assets/wall3.jpg" 
            alt="Banner" 
            className="banner-image" 
          />
          <img 
            src="/src/assets/logo1.png" 
            alt="Overlay" 
            className="overlay-image" 
          />
        </div>
        
        <h1 className="heading">About Us</h1>
        <div className="about-us-container">
          <p className="about-us-text">
            Welcome to Gala, your one-stop destination for discovering, registering, and engaging with Galas that spark your interest and passion!
          </p>
          <p className="about-us-text">
            Our vision is to create a vibrant community where people can connect through shared interests, discover new experiences, and participate in Galas that inspire and entertain. We believe that Galas bring people together, fostering collaboration, learning, and enjoyment. Gala aims to make it easy for everyone to be part of this exciting journey.
          </p>
          <p className="about-us-text">
            Our mission is to enhance the Gala experience by providing a user-friendly platform that facilitates effortless Gala discovery, registration, and interaction. We strive to empower Gala organizers by giving them the tools they need to effectively promote their Galas, while also ensuring that attendees have all the information they need to make informed decisions about their participation.
          </p>
        </div>

        <div className="divider"></div> {/* Line between sections */}
        
        <h2 className="upcoming-events-heading">Upcoming Events</h2> {/* New heading */}
        
        <div className="cards-container">
          {events.map((event) => (
            <Card key={event._id} className="card">
              <CardActionArea onClick={() => handleCardClick(event._id)}>
                <CardMedia
                  className="card-media"
                  component="img"
                  image={`data:image/png;base64,${event.picture}`}
                  alt={event.eventName}
                />
                <div className="card-content">
                  <Typography gutterBottom variant="h5" component="div" className="card-title">
                    {event.eventName}
                  </Typography>
                  <Typography variant="body2" className="card-date">
                    Start Date: {formatDate(event.startDate)}
                  </Typography>
                  <Typography variant="body2" className="card-description">
                    {getFirstSentence(event.description)}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
