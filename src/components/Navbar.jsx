import React from 'react';
import './Navbar.css';

const Navbar = ({onSignOut}) => {
  return (
    <nav>
      <div className="navbar-logo">
        <a href="/" aria-label="Home">Chat App</a>
      </div>
      <div className="nav-items">
        <ul className='nav-links'>
          <li><a href="/about" aria-label="About">Home</a></li>
          <li><a href="/contact" aria-label="Contact">Messages</a></li>
          <li className='logout-btn' ><a onClick={onSignOut} href="/register" aria-label="Register">Logout</a></li>
         </ul>
      </div>
    </nav>
  );
};

export default Navbar;
