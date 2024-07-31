src/components/EventItem.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventItem.css'; // Ensure you import the CSS file for styling
import Navbar from './Navbar';

const EventItem = ({ event }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleRegister = () => {
    navigate('/register', { state: { event } });
  };

  return (
    <div className="event-item">
      <Navbar/>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <button onClick={handleLike}>Like ({likes})</button>
      <div className="comment-section">
        <input 
          type="text" 
          placeholder="Add a comment" 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
        />
        <button onClick={handleComment}>Comment</button>
      </div>
      <div className="comments">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default EventItem;
