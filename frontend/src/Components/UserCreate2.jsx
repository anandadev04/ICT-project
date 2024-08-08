import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
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
      let errors = {};

      if (!values.eventName) {
        errors.eventName = "Event name is required";
      } else if (values.eventName.length < 3) {
        errors.eventName = "Event name should be at least 3 characters long";
      } else if (values.eventName.length > 50) {
        errors.eventName = "Event name shouldn't be more than 50 characters";
      }

      if (!values.description) {
        errors.description = "Event description is required";
      }

      if (!values.startDate) {
        errors.startDate = "Please select a start date";
      }

      if (!values.endDate) {
        errors.endDate = "Please select an end date";
      }

      if (!values.venue) {
        errors.venue = "Please enter the venue";
      }

      if (!values.timings) {
        errors.timings = "Please enter the timings";
      }

      if (!values.days) {
        errors.days = "Please enter the days";
      }

      if (!values.picture) {
        errors.picture = "Please provide a picture URL";
      } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(values.picture)) {
        errors.picture = "Please provide a valid image URL";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);       
        await axios.post("http://localhost:4000/events", values); // Update to your backend URL
        navigate("/portal/user-list2");
      } catch (error) {
        console.log(error);
        alert("Submission failed");
        setLoading(false);
      }
    }
  });

  return (
    <div className='container'>
      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Event Name</label>
            <input 
              name='eventName' 
              value={myFormik.values.eventName} 
              onChange={myFormik.handleChange} 
              type={"text"}
              className={`form-control ${myFormik.errors.eventName ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.eventName}</span>
          </div>

          <div className="col-lg-6">
            <label>Description</label>
            <input 
              name='description' 
              value={myFormik.values.description} 
              onChange={myFormik.handleChange} 
              type={"text"}
              className={`form-control ${myFormik.errors.description ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.description}</span>
          </div>

          <div className='col-lg-4'>
            <label>Start Date</label>
            <input
              name='startDate'
              type='date'
              value={myFormik.values.startDate}
              onChange={myFormik.handleChange}
              className={`form-control ${myFormik.errors.startDate ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.startDate}</span>
          </div>

          <div className='col-lg-4'>
            <label>End Date</label>
            <input
              name='endDate'
              type='date'
              value={myFormik.values.endDate}
              onChange={myFormik.handleChange}
              className={`form-control ${myFormik.errors.endDate ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.endDate}</span>
          </div>

          <div className='col-lg-4'>
            <label>Timings</label>
            <input 
              name='timings' 
              value={myFormik.values.timings} 
              onChange={myFormik.handleChange}
              type={"text"}
              className={`form-control ${myFormik.errors.timings ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.timings}</span>
          </div>

          <div className='col-lg-4'>
            <label>Days</label>
            <input 
              name='days' 
              value={myFormik.values.days} 
              onChange={myFormik.handleChange}
              type={"text"}
              className={`form-control ${myFormik.errors.days ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.days}</span>
          </div>

          <div className='col-lg-4'>
            <label>Venue</label>
            <input 
              name='venue' 
              value={myFormik.values.venue} 
              onChange={myFormik.handleChange}
              type={"text"}
              className={`form-control ${myFormik.errors.venue ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.venue}</span>
          </div>

          <div className='col-lg-4'>
            <label>Picture URL</label>
            <input 
              name='picture' 
              value={myFormik.values.picture} 
              onChange={myFormik.handleChange}
              type={"text"}
              className={`form-control ${myFormik.errors.picture ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.picture}</span>
          </div>

          <div className='col-lg-4 mt-3'>
            <input 
              disabled={isLoading} 
              type="submit" 
              value={isLoading ? "Submitting..." : "Create"} 
              className='btn btn-primary' 
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
