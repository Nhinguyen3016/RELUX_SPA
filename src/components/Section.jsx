import React from 'react';
import '../styles/Section.css';
import spaImage from '../images/spaRoom.png';
import modelImage from '../images/modelImage.png';

const Section = () => {
  return (
    <div className="section-container">
      <div className="upper-section">
        <div className="text-block">
          <p>Hi, nice to meet you in spa</p>
        </div>
      <img src={modelImage} alt="Spa Room" className="spa-image" />
      </div>
      <div className="lower-section">
        <div className="model-container">
          <img src={spaImage} alt="Model" className="model-image" />
        </div>
        <div className="form-container">
          <form className="service-form">
            <label htmlFor="serviceCategory">Service Category</label>
            <select id="serviceCategory" name="serviceCategory">
              <option value="">-Any-</option>
              <option value="facial">Facial</option>
              <option value="massage">Massage</option>
            </select>
            <label htmlFor="service">Service</label>
            <select id="service" name="service">
              <option value="">-Select-</option>
              <option value="spa">Spa</option>
              <option value="therapy">Therapy</option>
            </select>
            <label htmlFor="location">Location</label>
            <select id="location" name="location">
              <option value="">-Any-</option>
              <option value="newyork">New York</option>
              <option value="la">Los Angeles</option>
            </select>
            <label htmlFor="employee">Employee</label>
            <select id="employee" name="employee">
              <option value="">-Any-</option>
              <option value="john">John</option>
              <option value="anna">Anna</option>
            </select>
            <button type="submit" className="next-btn">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Section;
