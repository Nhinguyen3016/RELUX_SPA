import React from 'react';
import '../../styles/mainlayout/Footer.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="subscription">
          <h3 className="subscription-title">
            We don't keep our beauty secrets
          </h3>
          <p>Enter your email for special promotions.</p>
          <div className="subscription-form">
            <input
              type="email"
              placeholder="Your E-mail"
              className="email-input"
            />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
        <div className="contact-info">
          <h3>Contact</h3>
          <p>
            <FaMapMarkerAlt /> Da Nang, Viet Nam
          </p>
          <p>
            <FaPhoneAlt /> (+84) 123456789
          </p>
        </div>
        <div className="hours-info">
          <h3>Hours</h3>
          <div className="hours-grid">
            <div className="day">Mon to Fri:</div>
            <div className="time">7:30 am - 1:00 am</div>

            <div className="day">Sat:</div>
            <div className="time">9:00 am - 1:00 am</div>

            <div className="day">Sun:</div>
            <div className="time">9:00 am - 11:30 pm</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="branding">
          <p>ReLux</p>
        </div>
        <div className="description">
          <p>ReLux Spa © 2024 All Rights Reserved.</p>
        </div>
        <div className="social-media">
          <FaFacebookF className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaTwitter className="social-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;