import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/services/ServicesPage.css';
import FaqSection from '../../page/services/component/FaqSection';
import Body from '../../images/body.png';

const PageServices = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <img src={Body} alt="Service Promotion" className="services-image" />
      <Outlet />
      
      <FaqSection />
    </div>
  );
};

export default PageServices;