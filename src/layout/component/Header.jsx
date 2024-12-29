import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/mainlayout/Header.css';

import logo from '../../images/Logo.png';
import smallIcon from '../../images/dropdown.png';
import defaultAvatar from '../../images/avatar_pf.jpg';
import logout from '../../images/logout.png';
import user from '../../images/user.png';

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:3000";

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [serviceLinks, setServiceLinks] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const response = await fetch(`${API_HOST}/v1/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data && data.data) {
          setUserInfo(data.data);
          setSelectedAvatar(data.data.avatar || null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const endpoints = [
          `${API_HOST}/v1/service-categories/6`,
          `${API_HOST}/v1/service-categories/7`,
          `${API_HOST}/v1/service-categories/8`,
          `${API_HOST}/v1/service-categories/9`
        ];

        const categoryPaths = {
          6: 'services/body-treatments',
          7: '/services/facials',
          8: '/services/massages',
          9: '/services/spa-programs'
        };

        const responses = await Promise.all(endpoints.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((response) => response.json()));

        const links = data.map((serviceData, index) => {
          const categoryId = endpoints[index].split('/').pop();
          return {
            name: serviceData.data.name,
            link: categoryPaths[categoryId] || `/services/${serviceData.data.slug || index + 1}`,
          };
        });

        setServiceLinks(links);
      } catch (error) {
        console.error('Error fetching service categories:', error);
      }
    };

    fetchServiceCategories();
  }, []);

  const handleIconClick = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/account');
      }, 2000);
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/account');
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, [selectedAvatar]);

  return (
    <header className="header">
      {showAlert && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px 20px',
            borderRadius: '4px',
            border: '1px solid #f5c6cb',
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Please log in to access your profile
        </div>
      )}
      <div className="logo">
        <img src={logo} alt="ReLux Logo" />
        <h1>ReLux</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
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
                {serviceLinks.map((service, index) => (
                  <Link to={service.link} key={index}>{service.name}</Link>
                ))}
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
      <div className="user-profile">
        <div className="avatar-container" onClick={handleIconClick}>
          <img 
            src={selectedAvatar || (userInfo?.avatar ? `${API_HOST}/v1/images/${userInfo.avatar}` : defaultAvatar)} 
            alt="User Avatar"
            className="avatar-image"
          />
          {isDropdownOpen && localStorage.getItem('authToken') && (
            <div className="profile-dropdown">
              <Link to="/profile" className="dropdown-item">
                <img src={user} alt="Profile" className="dropdown-icon" />
                Profile
              </Link>
              <button onClick={handleLogout} className="dropdown-item">
                <img src={logout} alt="Logout" className="dropdown-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;