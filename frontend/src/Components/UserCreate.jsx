import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "" // Add password field
    },
    validate: (values) => {
      let errors = {};

      if (!values.userName) {
        errors.userName = "Please enter username";
      } else if (values.userName.length < 5) {
        errors.userName = "Name shouldn't be less than 5 letters";
      } else if (values.userName.length > 20) {
        errors.userName = "Name shouldn't be more than 20 letters";
      }

      if (!values.email) {
        errors.email = "Please enter email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = "Please enter phone number";
      } else if (!/^\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = "Phone number should be 10 digits";
      }

      if (!values.address) {
        errors.address = "Please enter address";
      }

      if (!values.password) {
        errors.password = "Please enter password"; // Add password validation
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("http://localhost:4000/newuser", values); // Update the URL if needed
        navigate("/portal/user-list");
      } catch (error) {
        console.log(error);
        alert("Validation failed");
        setLoading(false);
      }
    }
  });

  return (
    <div className='container'>
      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Username</label>
            <input 
              name='userName' 
              value={myFormik.values.userName} 
              onChange={myFormik.handleChange} 
              type={"text"}
              className={`form-control ${myFormik.errors.userName ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.userName}</span>
          </div>

          <div className="col-lg-6">
            <label>Email</label>
            <input 
              name='email' 
              value={myFormik.values.email} 
              onChange={myFormik.handleChange} 
              type={"email"}
              className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
          </div>

          <div className="col-lg-6">
            <label>Phone Number</label>
            <input 
              name='phoneNumber' 
              value={myFormik.values.phoneNumber} 
              onChange={myFormik.handleChange} 
              type={"text"}
              className={`form-control ${myFormik.errors.phoneNumber ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.phoneNumber}</span>
          </div>

          <div className="col-lg-6">
            <label>Address</label>
            <input 
              name='address' 
              value={myFormik.values.address} 
              onChange={myFormik.handleChange} 
              type={"text"}
              className={`form-control ${myFormik.errors.address ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.address}</span>
          </div>

          <div className="col-lg-6">
            <label>Password</label>
            <input 
              name='password' 
              value={myFormik.values.password} 
              onChange={myFormik.handleChange} 
              type={"password"}
              className={`form-control ${myFormik.errors.password ? "is-invalid" : ""} `}
            />
            <span style={{ color: "red" }}>{myFormik.errors.password}</span>
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
