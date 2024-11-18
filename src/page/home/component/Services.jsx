import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/home/Services.css';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const endpoints = [
          `${API_HOST}/v1/service-categories/1`,
          `${API_HOST}/v1/service-categories/2`,
          `${API_HOST}/v1/service-categories/3`,
          `${API_HOST}/v1/service-categories/4`
        ];

        const responses = await Promise.all(endpoints.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((response) => response.json()));

        const servicesWithIcons = data.map((serviceData) => ({
          ...serviceData.data,
          icon: getServiceIcon(serviceData.data.typeService),
        }));

        setServices(servicesWithIcons);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServicesData();
  }, []);

  const getServiceIcon = (typeService) => {
    switch (typeService) {
      case 'Skin care':
        return '💆‍♀️';
      case 'Therapy':
        return '🧖‍♀️';
      case 'Relaxation':
        return '💆‍♂️';
      case 'Body Care':
        return '👣';
      case 'Wellness':
        return '🌿';
      case 'Beauty':
        return '💅';
      default:
        return '❓'; 
    }
  };

  const handleServiceClick = (typeService) => {
    let path = '/services';
    switch (typeService) {
      case 'Wellness':
        path += '/body-treatments';
        break;
      case 'Relaxation':
        path += '/facials';
        break;
      case 'Skin care':
        path += '/massages';
        break;
      case 'Beauty':
        path += '/spa-programs';
        break;
      default:
        path += '/other';
    }
    navigate(path);
  };

  if (services.length === 0) {
    return <p>Loading services...</p>;
  }

  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            className="service-card"
            key={index}
            onClick={() => handleServiceClick(service.typeService)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.name}</h3>
            <p className="service-description">{service.descriptionShort}</p>
            <p className="service-type">{service.typeService}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
