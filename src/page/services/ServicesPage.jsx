import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/services/ServicesPage.css';
import FaqSection from '../../page/services/component/FaqSection';
import Body from '../../images/body.png';
<<<<<<< HEAD
=======
import Services from '../home/component/Services';
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b

const PageServices = () => {
  return (
    <div className="services-container">
<<<<<<< HEAD
      <h2 className="services-title">Our Services</h2>
      <img src={Body} alt="Service Promotion" className="services-image" />
=======
      {/* <h2 className="services-title">Our Services</h2> */}
      <img src={Body} alt="Service Promotion" className="services-image" />

      <Services />
      
>>>>>>> 5e54b7db1a2b413a75d4ed18f1463daecf777e0b
      <Outlet />
      
      <FaqSection />
    </div>
  );
};

export default PageServices;