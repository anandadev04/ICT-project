import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EventEdit() {
    const { id } = useParams(); // Access parameters from URL
    const [isLoading, setLoading] = useState(false);
    const [eventId, setEventId] = useState(null); // Initialize state for event ID
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Params:', id);

        if (id) {
            fetchEventData();
        } else {
            console.error('No ID parameter found');
        }
    }, [id]);

    // Function to fetch event data based on ID
    const fetchEventData = async () => {
        setLoading(true);
        try {
            console.log('Event ID:', id); // Debug line to verify ID
            if (!id) {
                throw new Error('Event ID is undefined');
            }
            const response = await axios.get(`http://localhost:4000/events/${id}`);
            formik.setValues(response.data);
            setEventId(response.data._id);
        } catch (error) {
            console.error('Error fetching event data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            eventName: "",
            description: "",
            startDate: "",
            endDate: "",
            timings: "",
            days: "",
            venue: "",
            picture: ""
        },
        validate: (values) => {
            const errors = {};

            if (!values.eventName) {
                errors.eventName = "Event name is required";
            }

            if (!values.description) {
                errors.description = "Event description is required";
            }

            if (!values.startDate) {
                errors.startDate = "Start date is required";
            }

            if (!values.endDate) {
                errors.endDate = "End date is required";
            }

            if (!values.venue) {
                errors.venue = "Venue is required";
            }

            if (!values.timings) {
                errors.timings = "Timings are required";
            }

            if (!values.days) {
                errors.days = "Days are required";
            }

            if (!values.picture) {
                errors.picture = "Picture URL is required";
            }

            return errors;
        },
        onSubmit: async (values) => {
            console.log('Submitting form with values:', values); // Debug line
            try {
                setLoading(true);

                const endDateTimestamp = Math.floor(new Date(values.endDate).getTime() / 1000);

                const updatedEvent = {
                    eventName: values.eventName,
                    description: values.description,
                    startDate: values.startDate,
                    endDate: endDateTimestamp,
                    timings: values.timings,
                    days: values.days, // Convert days to array
                    venue: values.venue,
                    picture: values.picture
                };

                await axios.put(`http://localhost:4000/events/${eventId}`, updatedEvent); // Use eventId for update
                navigate('/portal/user-list2');
            } catch (error) {
                console.error('Error updating event:', error);
                alert('Update failed');
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>EventEdit - ID: {id}</h3>
            <div className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Event Name</label>
                            <input
                                name='eventName'
                                value={formik.values.eventName}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.eventName ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.eventName}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Description</label>
                            <input
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.description ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.description}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Start Date</label>
                            <input
                                name='startDate'
                                type='text'
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.startDate ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.startDate}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>End Date</label>
                            <input
                                name='endDate'
                                type='text'
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.endDate ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.endDate}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Timings</label>
                            <input
                                name='timings'
                                value={formik.values.timings}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.timings ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.timings}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Days</label>
                            <input
                                name='days'
                                value={formik.values.days}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.days ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.days}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Venue</label>
                            <input
                                name='venue'
                                value={formik.values.venue}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.venue ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.venue}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Picture URL</label>
                            <input
                                name='picture'
                                value={formik.values.picture}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.picture ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.picture}</span>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input
                                disabled={isLoading}
                                type="submit"
                                value={isLoading ? "Updating..." : "Update"}
                                className='btn btn-primary'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EventEdit;
