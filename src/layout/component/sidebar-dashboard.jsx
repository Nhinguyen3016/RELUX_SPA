
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/dashboard/Sidebar-dashboard.css';
import logo from '../../images/Logo.png';
import dashboardIcon from '../../image/dashboard.png';
import bookingIcon from '../../image/booking.png';
import servicesIcon from '../../image/Service.png';
import feekbackIcon from '../../image/feekback.png';
import staffIcon from '../../image/staff.png';


const Sidebar = () => {
  const pathName=useLocation().pathname;
  console.log(pathName);
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="logo-sidebar">
        <img src={logo} alt="ReLux" /> 
        <h1>ReLux</h1>
      </Link>
      <nav>
        <ul  className="nav-links-sidebar">
          <li className={(pathName=== '/dashboard')?'active' :''}>
            <Link to="/dashboard" >
            <img src={dashboardIcon} alt="icon dashboard" className="icon" /> 
            Dashboard
            </Link>
          </li>
          <li className={(pathName=== '/bookingdashboard')?'active' :''}>
            <Link to="/bookingdashboard">
              <img src={bookingIcon} alt="icon booking" className="icon" />
              Booking
            </Link>
          </li>
          <li className={(pathName=== '/servicecategory') || (pathName=== '/servicecategory/service') ?'active' :''}>          
            <Link to="/servicecategory">
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
          <li className={(pathName=== '/staff')?'active' :''}>
            <Link to="/staff">
              <img src={staffIcon} alt="icon staff" className="icon" />
              Staff
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
