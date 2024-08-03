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
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/events');
        setEvents(response.data);

        const userEmail = localStorage.getItem('userEmail');
        const likedResponse = await axios.get(`http://localhost:4000/api/likedEvents?email=${userEmail}`);
        const likedEvents = likedResponse.data.map(event => event.eventName);

        const initialLiked = response.data.map(event => likedEvents.includes(event.eventName));
        setLiked(initialLiked);
        setNewComment('');
        setComments(Array(response.data.length).fill([]));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleLike = async (index, event) => {
    event.stopPropagation();
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);

    const email = localStorage.getItem('userEmail');
    const likeData = {
      username: localStorage.getItem('userName'),
      email,
      eventName: events[index].eventName,
    };

    try {
      if (newLiked[index]) {
        // User is liking the event
        await axios.post('http://localhost:4000/api/like', likeData);
      } else {
        // User is unliking the event
        await axios.post('http://localhost:4000/api/unlike', likeData);
      }
    } catch (error) {
      console.error('Error handling like:', error);
      setLiked(prev => {
        const updated = [...prev];
        updated[index] = !updated[index]; // revert to previous state
        return updated;
      });
    }
  };

  const handleOpenDialog = (index, event) => {
    event.stopPropagation();
    setSelectedIndex(index);
    setOpenDialog(true);
    fetchComments(events[index].eventName);
  };

  const handleCloseDialog = (event) => {
    event.stopPropagation();
    setOpenDialog(false);
    setComments([]);  // Clear comments when dialog closes
  };

  const fetchComments = (eventName) => {
    axios.get(`http://localhost:4000/api/comments?eventName=${eventName}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentData = {
        eventName: events[selectedIndex].eventName,
        userName: localStorage.getItem('userName'),
        comments: newComment
      };

      axios.post('http://localhost:4000/api/comments', commentData)
        .then(() => {
          setComments(prevComments => [commentData, ...prevComments]);
          setNewComment('');
        })
        .catch(error => {
          console.error('Error adding comment:', error);
          alert('Failed to add comment: ' + error.response.data);
        });
    }
  };

  const handleCommentChange = (value) => {
    setNewComment(value);
  };

  const handleRegisterClick = (event, eventName) => {
    event.stopPropagation();
    navigate('/register', { state: { eventName } });
  };

  const handleCardClick = (eventId) => {
    navigate(`/eventdetails/${eventId}`);
  };

  return (
    <div className="eventlist-container">
      <Navbar />
      {events.map((event, index) => (
        <StyledCard key={event._id} className="styled-card">
          <CardActionArea onClick={() => handleCardClick(event._id)}>
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
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#424242',
            color: '#e0e0e0',
            height: '80vh',
            overflowY: 'auto',
          },
          '& .MuiDialogTitle-root': {
            backgroundColor: '#333',
            color: '#e0e0e0',
            position: 'relative',
          },
          '& .MuiDialogContent-root': {
            backgroundColor: '#424242',
            color: '#e0e0e0',
            overflowY: 'auto',
          },
          '& .MuiDialogActions-root': {
            backgroundColor: '#333',
            color: '#e0e0e0',
          }
        }}
      >
        <DialogTitle>
          Add a Comment
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="comment-input-container">
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Type your comment"
              type="text"
              fullWidth
              variant="outlined"
              value={newComment}
              onChange={(e) => handleCommentChange(e.target.value)}
              InputProps={{
                style: { color: '#e0e0e0' },
              }}
              InputLabelProps={{
                style: { color: '#81bde8' },
              }}
              className="comment-textfield"
            />
            <IconButton
              color="primary"
              onClick={handleAddComment}
              className="send-button"
            >
              <SendIcon />
            </IconButton>
          </div>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <Typography variant="subtitle1" sx={{ color: '#81bde8' }}>{comment.userName}</Typography>
                <Typography variant="body2">{comment.comments}</Typography>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Eventlist;

