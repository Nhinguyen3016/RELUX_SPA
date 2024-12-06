import React, { useState } from 'react';
import '../../../styles/booking/component/FourStep.css';
const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bookingNotes: ''
  });
  
  const [phoneError, setPhoneError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'phone') {
      setPhoneError('');
    }
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{3}$/;
    return phoneRegex.test(phone);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setPhoneError('Phone number is invalid.');
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="appointment-form-container">
      <h1 className="form-title">Make an Appointment</h1>
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Phone</label>
          <div className="phone-input-container">
            <div className="country-code">
              <img
                src="/images/flags/vn.png"
                alt="Vietnam flag"
                className="flag-icon"
              />
              <span>+84</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="561-666-660"
              required
              className="phone-input"
            />
          </div>
          {phoneError && (
            <p className="error-message">{phoneError}</p>
          )}
        </div>
        
        <div className="form-group">
          <label>Booking notes</label>
          <textarea
            name="bookingNotes"
            value={formData.bookingNotes}
            onChange={handleInputChange}
            placeholder="Add any special requests or notes"
          />
        </div>
        
        <div className="button-group">
          <button type="button" className="back-button">
            Back
          </button>
          <button type="submit" className="next-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;