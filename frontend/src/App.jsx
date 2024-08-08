import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup';
import Home from './Components/Home';
import Profile from './Components/Profile'
import EventList from './Components/EventList'
import Register from './Components/Register'
import Eventdetails from './Components/Eventdetails';
import Userlist from './Userlist';
import Userlist2 from './Userlist2';
import Portal from './Portal';
import UserCreate from './UserCreate';
import UserCreate2 from './UserCreate2';
import UserView from './UserView';
import UserView2 from './UserView2';
import UserEdit from './UserEdit';
import UserEdit2 from './UserEdit2';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Topbar from './Topbar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/event" element={<EventList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/eventdetails/:eventId" element={<Eventdetails />} />
        <Route path="/regback" element={<EventList />}/>
        <Route path='/pul' element={<Navigate to="/portal/user-list" />} />
        <Route path='/' element={<Navigate to="/portal/user-list" />} />
        <Route path='/portal' element={<Portal />}>
          <Route index element={<Navigate to="user-list" />} /> {/* Optional if you also want to set /portal default */}
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user-list' element={<Userlist />} />
          <Route path='user-list2' element={<Userlist2 />} />
          <Route path='create-user' element={<UserCreate />} />
          <Route path='create-user2' element={<UserCreate2 />} />
          <Route path='user-view/:id' element={<UserView />} />
          <Route path='event-view/:id' element={<UserView2 />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          <Route path='event-edit2/:id' element={<UserEdit2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;