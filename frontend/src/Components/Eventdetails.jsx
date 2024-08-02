// Eventdetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Eventdetails.css';
import SimpleImageSlider from "react-simple-image-slider";
import Navbar from './Navbar';

const Eventdetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="event-container-wrapper">
        <div className="event-container">
          <div className="event-slider">
            <SimpleImageSlider
              images={[{ url: `data:image/png;base64,${event.picture}` }]}
              autoPlay={true}
              width={600}
              height={400}
              slideDuration={0.5}
            />
          </div>
          <div className="event-content">
            <h2 className="event-title">{event.eventName}</h2>
            <div className="event-details">
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
              <p><strong>Timings:</strong> {event.timings}</p>
              <p><strong>Days:</strong> {event.days}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Likes:</strong> {event.likes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventdetails;
