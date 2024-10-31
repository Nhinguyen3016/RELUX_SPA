import React from 'react';
import '../../styles/contact/ContactPage.css';


import iconHome from "../../images/icon-address.svg";
import iconPhone from "../../images/icon-phone.svg";
import iconClock from "../../images/icon-clock.svg";
import heroImage from "../../images/icon-page.svg";
import spaImage from "../../images/icon-item.svg";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="contact-page">
     
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>Contact Us</h1>
        </div>
      </div>

     
      <div className="main-content">
        <div className="content-wrapper">
         
          <div className="left-column">
           
            <div className="contact-info-1">
              <div className="info-item">
                <img src={iconHome} alt="Address" className="info-icon" />
                <div className="info-content">
                  <h3>Address</h3>
                </div>
                <div className="info-add">
                <p>Da Nang, Viet Nam</p>
                </div>
              </div>
              <hr className="divider" />
              <div className="info-item">
                <img src={iconPhone} alt="Phone" className="info-icon" />
                <div className="info-content">
                  <h3>Get in Touch</h3> 
                </div>
                <div className="info-add">
                <p>+ (84) 123456789</p>
                </div>
              </div>
              <hr className="divider" />
              <div className="info-item">
                <img src={iconClock} alt="Hours" className="info-icon" />
                <div className="info-content">
                  <h3>Hours</h3></div>
                  <div className="info-hours">
                    <p>Mon to Fri: 7:30 am — 1:00 am</p>
                    <p>Sat: 9:00 am — 1:00 am</p>
                    <p>Sun: 9:00 am — 11:30 pm</p>
                  
                </div>
              </div>
              <hr className="divider" />
            </div>

           
            <div className="contact-form">
              <h2>Leave A Reply</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="form-input"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="form-textarea"
                />
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="right-column">
            <div className="image-container">
              <img 
                src={spaImage} 
                alt="Spa relaxation"
                className="spa-image-contact"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 