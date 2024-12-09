import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../../styles/mainlayout/Header.css';

import logo from '../../images/Logo.png';
import smallIcon from '../../images/dropdown.png';
import defaultAvatar from '../../images/avatar_pf.jpg'; // Default avatar if API doesn't return one
const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:3000";

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // State for user info
  const [selectedAvatar, setSelectedAvatar] = useState(null); // State for avatar preview
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return; // Handle token error
      }

      try {
        const response = await fetch(`${API_HOST}/v1/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data && data.data) {
          setUserInfo(data.data);
          setSelectedAvatar(data.data.avatar || null); // Set avatar if available
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); // Dependency array empty so it only runs once on mount

  const handleIconClick = () => {
    navigate('/profile');
  };

  // Dynamically update the avatar after a change in local storage
  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar); // Update state when localStorage changes
    }
  }, [selectedAvatar]); // Re-run when the avatar state changes

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
                <Link to="/services/body-treatments">Full Care Package</Link>
                <Link to="/services/facials">Massage and Relaxation Therapy</Link>
                <Link to="/services/massages">Skin Care and Body Scrub</Link>
                <Link to="/services/spa-programs">Manicure, Pedicure, and Steam Bath</Link>
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
                <Link to="/giftcard">GiftCard</Link>
              </div>
            )}
          </li>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>
      </nav>
      <div className="icon">
        <img 
          src={selectedAvatar || (userInfo?.avatar ? `${API_HOST}/v1/images/${userInfo.avatar}` : defaultAvatar)} 
          alt="User Avatar" 
          width="24" 
          height="24" 
          onClick={handleIconClick}
          style={{ cursor: 'pointer', borderRadius: '50%' }}
        />
      </div>
    </header>
  );
};

export default Header;
