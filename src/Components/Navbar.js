import React, { useState } from 'react';
import Display from "../images/Display.svg"
import "../css/Navbar.css";

const Navbar = ({ setGrouping, setOrdering }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
  };

  return (
    <nav className="navbar">
      <div className="display-btn" onClick={toggleDropdown}>
      <img src={Display}></img>
        Display
      </div>
      <div className={`nav-dropdown-content ${isDropdownVisible ? 'show' : ''}`}>
        <p>
          Grouping
          <select onChange={handleGroupingChange} id="grouping">
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </p>
        <p>
          Ordering
          <select onChange={handleOrderingChange} id="ordering">
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
