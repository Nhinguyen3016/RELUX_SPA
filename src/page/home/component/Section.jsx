import React from 'react';
import '../../../styles/home/Section.css';
import spaImage from '../../../images/spaRoom.png';
import modelImage from '../../../images/modelImage.png';
import ServiceForm from './ServiceForm';

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
          <ServiceForm />
        </div>
      </div>
    </div>
  );
};

export default Section;