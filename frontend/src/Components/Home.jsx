import { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
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

const rows = [
  {
      title: "Lizard",
      content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
  },
  {
      title: "Lizard",
      content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
  },
  {
      title: "Lizard",
      content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
  },
  {
    title: "Lizard",
    content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
  },
  {
    title: "Lizard",
    content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
  },
  {
    title: "Lizard",
    content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg"
  }
];

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleCardClick = () => {
    navigate('/eventdetails'); // Navigate to Eventdetails page
  }
const [count, setCount] = useState(0)
  return (
    <div>
      <Navbar />
      <div className="content">
        <h1 className="heading">Upcoming Events</h1>
        <div className="cards-container">
          {rows.map((row, index) => (
            <Card key={index} sx={{ maxWidth: 320, borderRadius: "5%", overflow: 'hidden', backgroundColor: '#333', color: 'white' }}>
              <GradientCardContent>
                <CardActionArea onClick={handleCardClick}>
                  <StyledCardMedia
                    component="img"
                    height="250"
                    image={row.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="white">
                      {row.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {row.content}
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
