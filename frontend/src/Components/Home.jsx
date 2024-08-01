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

const GradientCardContent = styled(CardContent)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(1),
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
}));

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

  const handleCardClick = () => {
    navigate(`/eventdetails`);
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        <h1 className="heading">Upcoming Events</h1>
        <div className="cards-container">
          {events.map((event) => (
            <Card key={event._id} sx={{ maxWidth: 320, borderRadius: "5%", overflow: 'hidden', backgroundColor: '#333', color: 'white' }}>
              <GradientCardContent>
                <CardActionArea onClick={() => handleCardClick()}>
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
                      {event.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </GradientCardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
