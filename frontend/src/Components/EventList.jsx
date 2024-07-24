// src/components/EventList.jsx

import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import './EventList.css'; // Ensure you import the CSS file for styling
import Navbar from './Navbar';

const EventList = () => {
  // Hardcoded event data
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Hardcoded events for demonstration
    const hardcodedEvents = [
      { id: 1, title: 'PMI Kerala Chapter Annual Conference - WAVES 2024', description: 'Hyatt Regency Trivandrum, CV Raman Pillai Road, DPI, Thycaud, Thiruvananthapuram, Kerala, India, Trivandrum, India', date: 'Sat Aug 10 2024' },
      { id: 2, title: '5 Days Arts, Garment Designing & Crafts Classes in Trivandrum 2', description: 'VIGIL Arts and Crafts Training Center, Vrindavan Gardens, Pottakkuzhi, Pattom Junction Near Employees Provident Fund Office and P.S.C Office, Bus Stop, opposite Pattom, Vrindavan Gardens, Thiruvananthapuram, Kerala 695004, India, Trivandrum', date: '2024-07-26' },
      { id: 3, title: 'Reset Retreats India', description: 'Kovalam Kerala India, Neyyattinkara, Trivandrum, India', date: 'Sun Sep 01 2024' },
    ];
    setEvents(hardcodedEvents);
  }, []);

  return (
    <div className="event-list">
      <Navbar/>
      <h1>Events</h1>
      <div className="events-grid">
        {events.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
