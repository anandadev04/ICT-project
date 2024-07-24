import React, { useState } from 'react';
import './Profile.css';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState({
    profilePicture: './src/assets/pp.webp',
    name: 'Anandadev A',
    email: 'bdrlstrange123@gmail.com',
    registeredEvent: 5,
    phone: '9495496414',
    address: 'Sreedeepam Thoongampara Kattakada PO Thiruvananthapuram',
  });

  const [editing, setEditing] = useState(false);
  const [editInfo, setInfo] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const editClick = () => {
    setEditing(true);
  };

  const saveClick = () => {
    setUser({
      ...user,
      name: editInfo.name,
      email: editInfo.email,
      phone: editInfo.phone,
      address: editInfo.address,
    });
    setEditing(false);
  };

  const change = (e) => {
    setInfo({
      ...editInfo,
      [e.target.name]:e.target.value,
    });
  };

  return (
    <div class='profile-body'>
    <div className="page-container">
      <Navbar/>
        <div className="profile-section">
          <img src={user.profilePicture} alt="Profile" className="profile-picture" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="info-section">
          <h3>User Information</h3>
          {editing ? (
            <div class='main'>
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
              <button onClick={saveClick} className="profile-button save-button">Save</button>
            </div>
          ) : (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
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
