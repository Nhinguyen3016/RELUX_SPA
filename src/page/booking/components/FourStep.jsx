import React, { useState, useEffect } from 'react';
import '../../../styles/booking/component/FourStep.css'; // Import the updated CSS file

const FourStep = ({ onNext, onBack }) => { 
  // 🟢 Tạo state riêng biệt cho "name" và "bookingNotes"
  const [name, setName] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  // 🟢 Load dữ liệu từ localStorage khi component được mount
  useEffect(() => {
    const savedName = localStorage.getItem('fourStepName');
    const savedBookingNotes = localStorage.getItem('fourStepBookingNotes');
    
    if (savedName) setName(savedName); // Load dữ liệu name từ localStorage
    if (savedBookingNotes) setBookingNotes(savedBookingNotes); // Load dữ liệu bookingNotes từ localStorage
  }, []);

  // 🟢 Lưu dữ liệu vào localStorage mỗi khi "name" hoặc "bookingNotes" thay đổi
  useEffect(() => {
    localStorage.setItem('fourStepName', name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem('fourStepBookingNotes', bookingNotes);
  }, [bookingNotes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      setName(value);
    } else if (name === 'bookingNotes') {
      setBookingNotes(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, bookingNotes });
    onNext(); // Trigger onNext when the form is submitted
  };

  return (
    <div className="appointment-form-container-fourstep">
      <h1 className="form-title-fourstep">Make an Appointment</h1>
      
      <form onSubmit={handleSubmit} className="appointment-form-fourstep">
        
        {/* Form group for Name */}
        <div className="form-group-fourstep">
          <label className="form-label-fourstep">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="form-input-fourstep"
          />
        </div>
        
        {/* Form group for Booking Notes */}
        <div className="form-group-fourstep">
          <label className="form-label-fourstep">Booking Notes</label>
          <textarea
            name="bookingNotes"
            value={bookingNotes}
            onChange={handleInputChange}
            placeholder="Add any special requests or notes"
            className="form-textarea-fourstep"
          />
        </div>
        
        <div className="button-group-fourstep">
          <button type="button" className="back-button-fourstep" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="next-button-fourstep">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FourStep;
