import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from './Navbar';
import './EventList.css'; 

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

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 320,
  overflow: 'hidden',
  backgroundColor: '#333',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const getFirstSentence = (text) => {
  const sentenceEnd = /[.!?]/;
  const firstSentence = text.split(sentenceEnd)[0].trim();
  return firstSentence + (firstSentence ? '.' : ''); // Add period if there was text
};

const Eventlist = () => {
    const [liked, setLiked] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [newComment, setNewComment] = useState([]);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:4000/api/events')
        .then(response => {
          setEvents(response.data);
          setLiked(Array(response.data.length).fill(false));
          setNewComment(Array(response.data.length).fill(''));
          setComments(Array(response.data.length).fill([]));
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    }, []);
  
    const handleLike = (index, event) => {
      event.stopPropagation(); // Prevent the click event from propagating to parent elements
      const newLiked = [...liked];
      newLiked[index] = !newLiked[index];
      setLiked(newLiked);
    };
  
    const handleOpenDialog = (index, event) => {
      event.stopPropagation(); // Prevent the click event from propagating to parent elements
      setSelectedIndex(index);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = (event) => {
      event.stopPropagation(); // Prevent the click event from propagating to parent elements
      setOpenDialog(false);
    };
  
    const handleAddComment = async () => {
        if (newComment[selectedIndex].trim()) {
            try {
                const selectedEvent = events[selectedIndex];
                const commentData = {
                    eventName: selectedEvent.eventName,
                    userName: 'CurrentUserName', // Replace with actual user name
                    comments: newComment[selectedIndex].trim(),
                };
                
                const response = await axios.post('http://localhost:4000/api/comments', commentData);
                if (response.status === 201) {
                    const newComments = [...comments];
                    newComments[selectedIndex] = [newComment[selectedIndex], ...newComments[selectedIndex]];
                    setComments(newComments);
                    setNewComment(prev => {
                        const updated = [...prev];
                        updated[selectedIndex] = '';
                        return updated;
                    });
                } else {
                    console.error('Failed to add comment:', response.data);
                }
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };
  
    const handleCommentChange = (value) => {
      const updated = [...newComment];
      updated[selectedIndex] = value;
      setNewComment(updated);
    };

    const handleRegisterClick = (event, eventName) => {
      event.stopPropagation(); // Prevent the click event from propagating to parent elements
      navigate('/register', { state: { eventName } }); 
    };

    const handleCardClick = (eventId) => {
      navigate(`/eventdetails/${eventId}`); // Navigate to the event details page with the event ID
    };

    return (
        <div className="eventlist-container">
          <Navbar/>
          {events.map((event, index) => (
            <StyledCard key={event._id} className="styled-card">
              <CardActionArea onClick={() => handleCardClick(event._id)}> {/* Pass event ID */}
                <StyledCardMedia
                  component="img"
                  height="250"
                  image={`data:image/png;base64,${event.picture}`}
                  alt={event.eventName}
                  className="card-media"
                />
                <CardContent className="card-content">
                  <Typography gutterBottom variant="h5" component="div" className="card-title">
                    {event.eventName}
                  </Typography>
                  <Typography variant="body2" className="card-description">
                    {getFirstSentence(event.description)}
                  </Typography>
                  <div className="icon-buttons">
                    <IconButton onClick={(event) => handleLike(index, event)} sx={{ color: 'white' }}>
                      {liked[index] ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={(event) => handleOpenDialog(index, event)}>
                      <CommentIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Button
                      variant="outlined"
                      sx={{ 
                        borderColor: 'white', 
                        color: 'white',      
                        '&:hover': {
                          borderColor: '#81bde8', 
                          backgroundColor: 'rgba(137, 182, 227, 0.4)', 
                        }
                      }}
                      onClick={(e) => handleRegisterClick(e, event.eventName)}
                    >
                      Register
                    </Button>
                  </div>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          ))}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md" // Use "md" or adjust based on your design needs
            sx={{
              '& .MuiDialog-paper': {
                backgroundColor: '#424242', // Dark background for the dialog
                color: '#e0e0e0', // Light text color for contrast
                height: '80vh', // Set the height of the dialog
                overflowY: 'auto', // Add scroll for content overflow
              },
              '& .MuiDialogTitle-root': {
                backgroundColor: '#333333', // Slightly darker background for the title
                color: '#ffffff', // Title text color
              },
              '& .MuiDialogContent-root': {
                padding: '24px', // Add padding for content
              },
            }}
          >
            <DialogTitle>
              {events[selectedIndex]?.eventName}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseDialog}
                aria-label="close"
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Add a comment"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={newComment[selectedIndex]}
                onChange={(e) => handleCommentChange(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#616161', // Input border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#9e9e9e', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffffff', // Border color when focused
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#bdbdbd', // Label color
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#ffffff', // Label color when focused
                  },
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary" sx={{ color: '#81bde8' }}>
                Cancel
              </Button>
              <Button
                onClick={handleAddComment}
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  backgroundColor: '#81bde8', // Light blue background for the button
                  color: '#212121', // Dark text color for contrast
                  '&:hover': {
                    backgroundColor: '#4b9cd3', // Darker blue on hover
                  },
                }}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
};

export default Eventlist;
