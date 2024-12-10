import React, { useState } from 'react';
import '../../../styles/booking/component/FourStep.css'; // Import the updated CSS file

const FourStep = ({ onNext, onBack }) => { // Accept onNext and onBack as props
  const [formData, setFormData] = useState({
    name: '',
    bookingNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onNext(); // Trigger onNext when the form is submitted
  };

  return (
    <div className="appointment-form-container-fourstep">
      <h1 className="form-title-fourstep">Make an Appointment</h1>
      
      <form onSubmit={handleSubmit} className="appointment-form-fourstep">
        <div className="form-group-fourstep">
          <label className="form-label-fourstep">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
            className="form-input-fourstep"
          />
        </div>
        
        <div className="form-group-fourstep">
          <label className="form-label-fourstep">Booking Notes</label>
          <textarea
            name="bookingNotes"
            value={formData.bookingNotes}
            onChange={handleInputChange}
            placeholder="Add any special requests or notes"
            className="form-textarea-fourstep"
          />
        </div>
        
        <div className="button-group-fourstep">
          <button type="button" className="back-button-fourstep" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="next-button-fourstep"onClick={onNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FourStep;
