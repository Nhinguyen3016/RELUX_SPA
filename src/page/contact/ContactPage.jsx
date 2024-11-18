<<<<<<< HEAD
import React from 'react';
import '../../styles/contact/ContactPage.css';


=======
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/contact/ContactPage.css';

>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
import iconHome from "../../images/icon-address.svg";
import iconPhone from "../../images/icon-phone.svg";
import iconClock from "../../images/icon-clock.svg";
import heroImage from "../../images/icon-page.svg";
import spaImage from "../../images/icon-item.svg";

<<<<<<< HEAD
const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
=======
const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    customerName: '',  // Chỉnh lại tên trường này
    email: '',
    message: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu nhập vào
    if (!formData.customerName.trim()) {  // Sử dụng customerName thay vì name
      setError('Name is required.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Message is required.');
      return;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${API_HOST}/v1/contacts`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Message sent:", response.data);
      setSuccess("Your message has been sent successfully!");
      setError(null);
      setFormData({ customerName: '', email: '', message: '' });
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
      const errorMessage = error.response?.data?.message || "Failed to send message. Please try again.";
      setError(errorMessage);
      setSuccess(null);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
  };

  return (
    <div className="contact-page">
<<<<<<< HEAD
     
=======
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>Contact Us</h1>
        </div>
      </div>

<<<<<<< HEAD
     
      <div className="main-content">
        <div className="content-wrapper">
         
          <div className="left-column">
           
=======
      <div className="main-content">
        <div className="content-wrapper">
          <div className="left-column">
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
            <div className="contact-info-1">
              <div className="info-item">
                <img src={iconHome} alt="Address" className="info-icon" />
                <div className="info-content">
                  <h3>Address</h3>
                </div>
                <div className="info-add">
<<<<<<< HEAD
                <p>Da Nang, Viet Nam</p>
=======
                  <p>Da Nang, Viet Nam</p>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
                </div>
              </div>
              <hr className="divider" />
              <div className="info-item">
                <img src={iconPhone} alt="Phone" className="info-icon" />
                <div className="info-content">
                  <h3>Get in Touch</h3> 
                </div>
                <div className="info-add">
<<<<<<< HEAD
                <p>+ (84) 123456789</p>
=======
                  <p>+ (84) 123456789</p>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
                </div>
              </div>
              <hr className="divider" />
              <div className="info-item">
                <img src={iconClock} alt="Hours" className="info-icon" />
                <div className="info-content">
<<<<<<< HEAD
                  <h3>Hours</h3></div>
                  <div className="info-hours">
                    <p>Mon to Fri: 7:30 am — 1:00 am</p>
                    <p>Sat: 9:00 am — 1:00 am</p>
                    <p>Sun: 9:00 am — 11:30 pm</p>
                  
=======
                  <h3>Hours</h3>
                </div>
                <div className="info-hours">
                  <p>Mon to Fri: 7:30 am — 1:00 am</p>
                  <p>Sat: 9:00 am — 1:00 am</p>
                  <p>Sun: 9:00 am — 11:30 pm</p>
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
                </div>
              </div>
              <hr className="divider" />
            </div>

<<<<<<< HEAD
           
=======
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
            <div className="contact-form">
              <h2>Leave A Reply</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
<<<<<<< HEAD
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
=======
                    name="customerName"  // Thay đổi từ "name" thành "customerName"
                    value={formData.customerName}  // Dùng customerName thay vì name
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-input"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className="form-input"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={6}
                  className="form-textarea"
                  required
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
                />
                <button type="submit" className="submit-button">
                  Send Message
                </button>
<<<<<<< HEAD
              </form>
            </div>
          </div>
          
=======
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message-ct">{success}</p>}
              </form>
            </div>
          </div>

>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
          <div className="right-column">
            <div className="image-container-c">
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

<<<<<<< HEAD
export default ContactPage; 
=======
export default ContactPage;
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
