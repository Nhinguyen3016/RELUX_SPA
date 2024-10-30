import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';
import logo from '../../images/Logo.png';
import calendarIcon from '../../images/imageHeader.png';
import smallIcon from '../../images/dropdown.png';

const Header = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="ReLux Logo" />
        <h1>ReLux</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown" onMouseEnter={toggleServicesDropdown} onMouseLeave={toggleServicesDropdown}>
            <Link to="/services">Services</Link>
            <img src={smallIcon} alt="Small Icon" className="small-icon" />
            
            {isServicesDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/services/spa-programs">Spa Programs</Link></li>
                <li><Link to="/services/massages">Massages</Link></li>
                <li><Link to="/services/facials">Facials</Link></li>
                <li><Link to="/services/body-treatments">Body Treatments</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/pages">Pages</Link>
            <img src={smallIcon} alt="Small Icon" className="small-icon" />
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
