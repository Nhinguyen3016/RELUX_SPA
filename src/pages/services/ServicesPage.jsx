import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './ServicesPage.css';
import FaqSection from './FaqSection';
import Body from '../../images/body.png';
import Services from '../../components/Services';
import SpaPrograms from './SpaPrograms';
import Massages from './Massages';
import Facials from './Facials';
import BodyTreatments from './BodyTreatments';

const PageServices = () => {
    return (
        <div className="services-container">
              <h2 className="services-title">Our Services</h2>
              <img src={Body} alt="Service Promotion" className="services-image" />
            <Routes>
                <Route path="/" element={<Services />} />
                <Route path="/services/spa-programs" element={<SpaPrograms />} />
                <Route path="/services/massages" element={<Massages />} />
                <Route path="/services/facials" element={<Facials />} />
                <Route path="/services/body-treatments" element={<BodyTreatments />} />
            </Routes>

            <FaqSection />
        </div>
    );
};

export default PageServices;
