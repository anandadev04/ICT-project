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
  
    const handleLike = (index) => {
      const newLiked = [...liked];
      newLiked[index] = !newLiked[index];
      setLiked(newLiked);
    };
  
    const handleOpenDialog = (index) => {
      setSelectedIndex(index);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleAddComment = () => {
        if (newComment[selectedIndex].trim()) {
          const newComments = [...comments];
          newComments[selectedIndex] = [newComment[selectedIndex], ...newComments[selectedIndex]];
          setComments(newComments);
          setNewComment(prev => {
            const updated = [...prev];
            updated[selectedIndex] = '';
            return updated;
          });
        }
    };
  
    const handleCommentChange = (value) => {
      const updated = [...newComment];
      updated[selectedIndex] = value;
      setNewComment(updated);
    };

    const handleRegisterClick = (event) => {
      event.stopPropagation(); // Prevent the click event from propagating to parent elements
      navigate('/register'); 
    };

    return (
        <div className="eventlist-container">
          <Navbar/>
          {events.map((event, index) => (
            <StyledCard key={index} className="styled-card" >
              <CardActionArea onClick={() => handleCardClick(index)}>
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
                    <IconButton onClick={() => handleLike(index)} sx={{ color: 'white' }}>
                      {liked[index] ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleOpenDialog(index)}>
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
                      onClick={handleRegisterClick}
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
                backgroundColor: '#333', // Dark background for the dialog title
                color: '#e0e0e0', // Light text color for contrast
                position: 'relative', // Positioning for close icon
              },
              '& .MuiDialogContent-root': {
                backgroundColor: '#424242', // Dark background for the dialog content
                color: '#e0e0e0', // Light text color for contrast
                overflowY: 'auto', // Add scroll for content overflow
              },
              '& .MuiDialogActions-root': {
                backgroundColor: '#333', // Dark background for dialog actions
                color: '#e0e0e0', // Light text color for contrast
              }
            }}
          >
            <DialogTitle>
              Add a Comment
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseDialog}
                sx={{ position: 'absolute', right: 16, top: 8, color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <div className="comments-section">
                <div className="comments-list">
                  {comments[selectedIndex]?.map((comment, i) => (
                    <Typography key={i} variant="body2" className="comment">
                      {comment}
                    </Typography>
                  ))}
                </div>
                <div className="comment-input-container">
                  <TextField
                    label="Add a comment"
                    multiline
                    rows={2}
                    value={newComment[selectedIndex] || ''}
                    onChange={(e) => handleCommentChange(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className="comment-textfield"
                    InputProps={{
                      style: { color: 'white' }, // Text color in the input field
                    }}
                    InputLabelProps={{
                      style: { color: 'white' }, // Label color in the input field
                    }}
                  />
                  <IconButton
                    onClick={handleAddComment}
                    className="send-button"
                    sx={{ color: 'white' }}
                  >
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
    );
}

export default Eventlist;
