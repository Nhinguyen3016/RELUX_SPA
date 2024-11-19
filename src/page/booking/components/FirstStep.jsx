import React, { useState } from 'react';
import '../../../styles/booking/component/FirstStep.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    location: '',
    employee: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="appointment-container-firststep">
      <h2 className="appointment-title-firststep">Make an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form-firststep">
        <div className="form-group-firststep">
          <label htmlFor="service">Service</label>
          <div className="select-wrapper-firststep">
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-select-firststep"
            >
              <option value="">-Select-</option>
              <option value="service1">Service 1</option>
              <option value="service2">Service 2</option>
              <option value="service3">Service 3</option>
            </select>
          </div>
        </div>

        <div className="form-group-firststep">
          <label htmlFor="location">Location</label>
          <div className="select-wrapper-firststep">
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-select-firststep"
            >
              <option value="">-Any-</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
          </div>
        </div>

        <div className="form-group-firststep">
          <label htmlFor="employee">Employee</label>
          <div className="select-wrapper-firststep">
            <select
              id="employee"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="form-select-firststep"
            >
              <option value="">-Any-</option>
              <option value="employee1">Employee 1</option>
              <option value="employee2">Employee 2</option>
              <option value="employee3">Employee 3</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button-firststep">
          Next
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
