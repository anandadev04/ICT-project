import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventList() {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getEvents();
    console.log("welcome");
  }, []);

  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/events"); // Fetch events from the correct endpoint
      setEventList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Event ID is undefined');
      return;
    }

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this event?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:4000/events/${id}`); // Delete event by id
        getEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Event List</h1>
        <Link to="/portal/create-user2" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create Event
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading..." />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Timings</th>
                    <th>Days</th>
                    <th>Venue</th>
                    <th>Picture</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Timings</th>
                    <th>Days</th>
                    <th>Venue</th>
                    <th>Picture</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {eventList.map((event) => (
                    <tr key={event._id}>
                      <td>{event.eventName}</td>
                      <td>{event.description}</td>
                      <td>{event.startDate}</td>
                      <td>{event.endDate}</td>
                      <td>{event.timings}</td>
                      <td>{event.days}</td>
                      <td>{event.venue}</td>
                      <td>{event.picture}</td>
                      <td>
                        <Link to={`/portal/event-view/${event._id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                        <Link to={`/portal/event-edit2/${event._id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                        <button onClick={() => handleDelete(event._id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EventList;
