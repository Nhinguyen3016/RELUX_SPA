import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../../styles/mainlayout/Header.css';

import logo from '../../images/Logo.png';
import calendarIcon from '../../images/imageHeader.png';
import smallIcon from '../../images/dropdown.png';

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="ReLux Logo" />
        <h1>ReLux</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li 
            className="dropdown"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="dropdown-toggle">
              <span>Services</span>
              <img src={smallIcon} alt="Small Icon" className="small-icon" />
            </div>
            {isServicesOpen && (
              <div className="dropdown-menu">
                <Link to="/services">Services</Link>
                <Link to="/services/body-treatments">Body Treatments</Link>
                <Link to="/services/facials">Facials</Link>
                <Link to="/services/massages">Massages</Link>
                <Link to="/services/spa-programs">Spa Programs</Link>
              </div>
            )}
          </li>
          <li 
            className="dropdown"
            onMouseEnter={() => setIsPagesOpen(true)}
            onMouseLeave={() => setIsPagesOpen(false)}
          >
            <div className="dropdown-toggle">
              <span>Pages</span>
              <img src={smallIcon} alt="Small Icon" className="small-icon" />
            </div>
            {isPagesOpen && (
              <div className="dropdown-menu">
                <Link to="/gallery">Gallery</Link>
                <Link to="/team-our">Our Team</Link>
                <Link to="/account">Account</Link>
              </div>
            )}
          </li>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>
      </nav>
      <div className="icon">
        <img src={calendarIcon} alt="Calendar Icon" width="24" height="24" />
      </div>
    </header>
  );
};

export default Header;