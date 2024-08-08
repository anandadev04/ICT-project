import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventView() {
    const params = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getEventDetails();
    }, [params.id]);

    const getEventDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/events/${params.id}`);
            const data = response.data;

            // Convert endDate from Unix timestamp to a readable format
            const endDate = new Date(data.endDate * 1000).toLocaleDateString();

            setEventDetails({
                ...data,
                endDate,
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            <div>EventView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Event Details</h6>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading..." />
                    ) : (
                        eventDetails && (
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" cellSpacing="0">
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
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            
                                            <td>{eventDetails.eventName}</td>
                                            <td>{eventDetails.description}</td>
                                            <td>{eventDetails.startDate}</td>
                                            <td>{eventDetails.endDate}</td>
                                            <td>{eventDetails.timings}</td>
                                            <td>{eventDetails.days}</td>
                                            <td>{eventDetails.venue}</td>
                                            <td>
                                                <img src={eventDetails.picture} alt="Event" style={{ maxWidth: '100px' }} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default EventView;
