
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/sidebar.css';
import logo from '../../../image/logo.png';
import dashboardIcon from '../../../image/dashboard.png';
import bookingIcon from '../../../image/booking.png';
import servicesIcon from '../../../image/Service.png';
import feekbackIcon from '../../../image/feekback.png';
const Sidebar = () => {
  const pathName=useLocation().pathname;
  console.log(pathName);
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="ReLux" /> 
        <h1>ReLux</h1>
      </div>
      <nav>
        <ul  className="nav-links">
          <li className={(pathName=== '/dashboard')?'active' :''}>
            <Link to="/dashboard" >
            <img src={dashboardIcon} alt="icon dashboard" className="icon" /> 
            Dashboard
            </Link>
          </li>
          <li className={(pathName=== '/booking')?'active' :''}>
            <Link to="/booking">
              <img src={bookingIcon} alt="icon booking" className="icon" />
              Booking
            </Link>
          </li>
          <li className={(pathName=== '/service') || (pathName=== '/service/package') ?'active' :''}>          
            <Link to="/service">
              <img src={servicesIcon} alt="icon services" className="icon" />
              Services
            </Link>
          </li>
          <li className={(pathName=== '/feedback')?'active' :''}>
            <Link to="/feedback">
              <img src={feekbackIcon} alt="icon feekback" className="icon" />
              Feedback
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
