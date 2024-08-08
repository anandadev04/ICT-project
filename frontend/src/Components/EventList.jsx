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
  display: 'flex',
  flexDirection: 'column', 
  height: 550,
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
  return firstSentence + (firstSentence ? '.' : ''); 
};

const Eventlist = () => {
  const [liked, setLiked] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [events, setEvents] = useState([]);
  const [likeCounts, setLikeCounts] = useState({}); // State for like counts
  const navigate = useNavigate();

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

        // Fetch like counts
        const likeCountsResponse = await axios.get('http://localhost:4000/api/likeCounts');
        setLikeCounts(likeCountsResponse.data);
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
        // Update like counts
        setLikeCounts(prev => ({
          ...prev,
          [events[index].eventName]: (prev[events[index].eventName] || 0) + 1,
        }));
      } else {
        // User is unliking the event
        await axios.post('http://localhost:4000/api/unlike', likeData);
        // Update like counts
        setLikeCounts(prev => ({
          ...prev,
          [events[index].eventName]: (prev[events[index].eventName] || 0) - 1,
        }));
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
              className="cards-media"
            />
            <CardContent className="cards-content">
              <Typography gutterBottom variant="h5" component="div" className="cards-title">
                {event.eventName}
              </Typography>
              <Typography variant="body2" className="cards-description">
                {getFirstSentence(event.description)}
              </Typography>
            </CardContent>
            <div className="icon-buttons">
              <IconButton onClick={(event) => handleLike(index, event)} sx={{ color: 'white' }}>
                {liked[index] ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                <span style={{ marginLeft: '8px', color: 'white', fontSize: '0.875rem' }}>
                  {likeCounts[event.eventName] || 0}
                </span>
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
              variant="outlined"
              fullWidth
              placeholder="Enter your comment"
              value={newComment}
              onChange={(e) => handleCommentChange(e.target.value)}
              className="comment-textfield"
              InputProps={{
                style: { color: 'white', borderColor: 'white' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: '#81bde8',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#81bde8',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                }
              }}
            />
            <IconButton onClick={handleAddComment} color="inherit">
              <SendIcon className="send-button" />
            </IconButton>
          </div>
          <div className="comments-section">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.userName}</strong>: {comment.comments}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Eventlist;
