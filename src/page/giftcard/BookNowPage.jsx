import React from 'react';
import ServiceForm from '../home/component/ServiceForm';
import '../../styles/giftcard/BookNowPage.css';

const PageSection = () => {
  return (
    <div className="section-container-gc">
      <div className="hero-section-b-gc">
        <h1>Book Now</h1>
      </div>
      <div className="form-giftcard-main">
        <div className="form-container">
          <ServiceForm />
        </div>
      </div>
    </div>
  );
};

export default PageSection;