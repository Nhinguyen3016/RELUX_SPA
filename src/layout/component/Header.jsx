import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

import logo from '../../images/Logo.png';
import calendarIcon from '../../images/imageHeader.png';
import smallIcon from '../../images/dropdown.png';
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="ReLux Logo" />
        <h1>ReLux</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="">Home</Link></li>
          <li>
            <Link to="">Services</Link>
            <img src={smallIcon} alt="Small Icon" className="small-icon" />
          </li>
          <li>
            <Link to="">Pages</Link>
            <img src={smallIcon} alt="Small Icon" className="small-icon" />
          </li>
          <li><Link to="">Contacts</Link></li>
        </ul>
      </nav>
      <div className="icon">
        <img src={calendarIcon} alt="Calendar Icon" width="24" height="24" />
      </div>
    </header>
  );
};

export default Header;