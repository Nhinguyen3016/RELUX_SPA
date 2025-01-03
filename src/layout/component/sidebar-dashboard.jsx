import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/dashboard/Sidebar-dashboard.css';
import logo from '../../images/Logo.png';
import dashboardIcon from '../../image/dashboard.png';
import bookingIcon from '../../image/booking.png';
import servicesIcon from '../../image/Service.png';
import giftCards from '../../image/giftCards.png';
import schedulesIcon from '../../image/schedules.png';
import accountListIcon from '../../image/accountList.png';
import staffIcon from '../../image/staff.png';
import contactIcon from '../../image/contact.png';

const Sidebar = () => {
  const pathName=useLocation().pathname;
  const userRole = localStorage.getItem('userRole');
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="logo-sidebar">
        <img src={logo} alt="ReLux" /> 
        <h1>ReLux</h1>
      </Link>
      <nav>
        <ul  className="nav-links-sidebar">
        {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
          <li className={(pathName=== '/dashboard')?'active' :''}>
            <Link to="/dashboard" >
            <img src={dashboardIcon} alt="icon dashboard" className="icon" /> 
            Dashboard
            </Link>
          </li>
        )}
        {userRole === "EMPLOYEES" &&(
        <li className={(pathName=== '/bookingemployees')?'active' :''}>
            <Link to="/bookingemployees">
              <img src={bookingIcon} alt="icon booking" className="icon" />
              Booking
            </Link>
          </li>
        )}
          {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
            <>
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
          <li className={(pathName=== '/giftcards')?'active' :''}>
            <Link to="/giftcards">
              <img src={giftCards} alt="icon giftCards" className="icon" />
              Gift Cards
            </Link>
          </li>
          <li className={(pathName=== '/schedules')?'active' :''}>
            <Link to="/schedules">
              <img src={schedulesIcon} alt="icon schedules" className="icon" />
              Schedules
            </Link>
          </li>
          <li className={(pathName=== '/staff')?'active' :''}>
            <Link to="/staff">
              <img src={staffIcon} alt="icon staff" className="icon" />
              Staff
            </Link>
          </li>
          <li className={(pathName=== '/contact')?'active' :''}>
            <Link to="/contact">
              <img src={contactIcon} alt="icon contact" className="icon" />
              Contact
            </Link>
          </li>
          </>
          )}
          {userRole === "ADMIN" &&(
            <li className={(pathName=== '/accountlist')?'active' :''}>
            <Link to="/accountlist">
              <img src={accountListIcon} alt="icon account" className="icon" />
              Account
            </Link>
          </li>
          ) }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
