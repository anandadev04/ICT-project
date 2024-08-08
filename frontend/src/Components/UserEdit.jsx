import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
  const params = useParams(); // Access parameters from URL
  const [isLoading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Params:', params);

    if (params.id) { // Use params.id instead of params.email
      getUserData();
    } else {
      console.error('No ID parameter found');
    }
  }, [params.id]);

  // Function to fetch user data based on ID
  const getUserData = async () => {
    try {
      if (!params.id) {
        throw new Error('ID parameter is missing');
      }

      const user = await axios.get(`http://localhost:4000/user/${params.id}`); // Fetch user by ID
      myFormik.setValues(user.data);
      setUserId(user.data._id); // Set user ID
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  // Formik configuration
  const myFormik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      address: ""
    },
    validate: (values) => {
      let errors = {};

      if (!values.userName) {
        errors.userName = "Please enter username";
      } else if (values.userName.length < 5) {
        errors.userName = "Name shouldn't be less than 5 letters";
      } else if (values.userName.length > 25) {
        errors.userName = "Name shouldn't be more than 25 letters";
      }

      if (!values.email) {
        errors.email = "Please enter email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.phoneNumber) {
        errors.phoneNumber = "Please enter phone number";
      } else if (!/^\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
      }

      if (!values.address) {
        errors.address = "Please enter address";
      }

      return errors;
    },

    onSubmit: async (values) => {
      console.log('Submitting form with values:', values); // Debug line
      try {
        setLoading(true);
        await axios.put(`http://localhost:4000/user/${userId}`, values); // Update user by ID
        setLoading(false);
        navigate("/portal/user-list");
      } catch (error) {
        console.log('Error updating user:', error); // Show error in frontend console
        setLoading(false);
      }
    }
  });

  return (
    <>
      <h3>UserEdit - ID: {params.id}</h3>
      <div className='container'>
        <form onSubmit={myFormik.handleSubmit}>
          <div className='row'>
            <div className="col-lg-6">
              <label>Username</label>
              <input
                name='userName'
                value={myFormik.values.userName}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.userName ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.userName}</span>
            </div>

            <div className="col-lg-6">
              <label>Email</label>
              <input
                name='email'
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                type="email"
                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""}`}
                
              />
              <span style={{ color: "red" }}>{myFormik.errors.email}</span>
            </div>

            <div className='col-lg-6'>
              <label>Phone Number</label>
              <input
                name='phoneNumber'
                value={myFormik.values.phoneNumber}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.phoneNumber ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.phoneNumber}</span>
            </div>

            <div className='col-lg-6'>
              <label>Address</label>
              <input
                name='address'
                value={myFormik.values.address}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${myFormik.errors.address ? "is-invalid" : ""}`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.address}</span>
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

export default UserEdit;
