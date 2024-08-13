import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as MessageIcon } from '../assets/message.svg';
import { ReactComponent as ProfileIcon } from '../assets/profile.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';
import './Navbar.css';
import './Main.css'
import axios from 'axios';

const Main = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // Retrieve username from localStorage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);
    }
  , []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');  // Clear stored username
    navigate('/login');
  };

  return (
    <div className='main'>
      <nav>
        <div className="navbar-logo">
          <h1 href="/" aria-label="Home">Messenger</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>
        <div className="nav-items">
          <ul className='nav-links'>
            <li className='items-div'>
              <a href="#" aria-label="Home">Home</a>
              <HomeIcon className="nav-icon" />
            </li>
            <li className='items-div'>
              <a href="#" aria-label="Messages">Messages</a>
              <MessageIcon className="nav-icon" />
            </li>
            <li className='items-div'>
              <a href="#" aria-label="Profile">Profile</a>
              <ProfileIcon className="nav-icon" />
            </li>
            <li onClick={handleLogout} className='items-div'>
              <span>Logout</span>
              <LogoutIcon className="nav-icon" />
            </li>
          </ul>
        </div>
      </nav>
      <div className="user-info">
          <p>Welcome </p>
          <p>{username}!</p>
        </div>
    </div>
  );
};

export default Main;
