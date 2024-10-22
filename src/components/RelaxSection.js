import React from 'react';
import '../styles/RelaxSection.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import mainImage from '../images/facialTreatment.png';

const RelaxSection = () => {
  return (
    <div className="relax-section">
      <h2 className="section-title">Relax, Enjoy and Love Yourself</h2>
      <div className="image-container">
        <FaArrowLeft className="arrow left-arrow" />
        <img src={mainImage} alt="Facial Treatment" className="main-image" />
        <FaArrowRight className="arrow right-arrow" />
      </div>
    </div>
  );
};

export default RelaxSection;
