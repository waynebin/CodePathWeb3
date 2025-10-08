import React from 'react';
//import './sidebar.css';
// create a sidebar component to display navigation links
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><a href="#event1">Home</a></li>
        <li><a href="#event2">Financial Event 2</a></li>
        <li><a href="#event3">Financial Event 3</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
