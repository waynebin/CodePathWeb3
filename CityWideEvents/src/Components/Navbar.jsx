import React from 'react';  
import '../CSS/Navbar.css';
import Search from '../Components/Search.jsx';
// create a navbar component to display the app title
const Navbar = () => {
    const homeBtn = () => {
        window.location.href = '/';
    }
    const EventsBtn = () => {
        window.location.href = '/events';
    }
  return (
    <nav className="navbar">
      <h1 className="title"> CITYWIDE^Events</h1>
      <ul className="nav-links">
        <li><a href="/" onClick={homeBtn}>Home</a></li>
        <li><a href="/events" onClick={EventsBtn}>Events</a></li>
      </ul> 

    </nav>
  );
};

export default Navbar;
