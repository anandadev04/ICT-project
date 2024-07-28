import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Navbar from './Navbar';
import image from '../assets/person'

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [editInfo, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '', // Add a field for the profile picture
  });

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:4000/user/${userEmail}`)
        .then((response) => {
          setUser(response.data);
          setInfo({
            name: response.data.userName,
            email: response.data.email,
            phone: response.data.phoneNumber,
            address: response.data.address,
            profilePicture: response.data.profilePicture || 'image', // Set initial profile picture
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userEmail]);

  const editClick = () => {
    setEditing(true);
  };

  const saveClick = () => {
    const newData = {
      userName: editInfo.name,
      email: editInfo.email,
      phoneNumber: editInfo.phone,
      address: editInfo.address,
      profilePicture: editInfo.profilePicture,
    };

    console.log('Updating user with data:', newData); // Log the data being sent
    axios.put(`http://localhost:4000/user/${userEmail}`, newData)
      .then((response) => {
        setUser({
          ...user,
          ...newData,
        });
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  const change = (e) => {
    setInfo({
      ...editInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setInfo({
        ...editInfo,
        profilePicture: reader.result.split(',')[1], // Store only the Base64 string
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="page-container">
        <div className="profile-section">
          <img
            src={user.profilePicture ? `data:image/png;base64,${user.profilePicture}` : 'image'} // Use a default image if not set
            alt="Profile"
            className="profile-picture"
          />
          <h2>{user.userName}</h2>
          <p>{user.email}</p>
        </div>
        <div className="info-section">
          <h3>User Information</h3>
          {editing ? (
            <div className="main">
              <div className="input-group">
                <label>Name: </label>
                <input type="text" name="name" value={editInfo.name} onChange={change} />
              </div>
              <div className="input-group">
                <label>Email: </label>
                <input type="email" name="email" value={editInfo.email} onChange={change} />
              </div>
              <div className="input-group">
                <label>Phone: </label>
                <input type="text" name="phone" value={editInfo.phone} onChange={change} />
              </div>
              <div className="input-group">
                <label>Address: </label>
                <input type="text" name="address" value={editInfo.address} onChange={change} />
              </div>
              <div className="input-group">
                <label>Profile Picture: </label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <button onClick={saveClick} className="profile-button save-button">Save</button>
            </div>
          ) : (
            <div>
              <p>Name: {user.userName}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
              <p>Address: {user.address}</p>
              <p>Events Registered: {user.registeredEvent}</p>
              <button onClick={editClick} className="profile-button edit-button">Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
