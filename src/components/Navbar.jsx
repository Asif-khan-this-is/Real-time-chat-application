import React from 'react';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as MessageIcon } from '../assets/message.svg';
import { ReactComponent as ProfileIcon } from '../assets/profile.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';
import './Navbar.css';

const Navbar = () => {
  return (
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
            <a href="#" aria-label="messages">Messages</a>
            <MessageIcon className="nav-icon" />
          </li>
          <li className='logout-btn items-div' >
            <a  href="#" aria-label="Profile">Profile</a>
            <ProfileIcon className="nav-icon" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
