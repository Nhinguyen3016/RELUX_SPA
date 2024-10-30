import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Services.css';

const servicesData = [
  {
    title: 'Facials',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '💆‍♀️',
    link: '/services/facials',
  },
  {
    title: 'SPA Programs',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '🧖‍♀️',
    link: '/services/spa-programs',
  },
  {
    title: 'Massages',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '💆‍♂️',
    link: '/services/massages',
  },
  {
    title: 'Body Treatments',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '👣',
    link: '/services/body-treatments',
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <div className="services-container">
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div
            className="service-card"
            key={index}
            onClick={() => handleCardClick(service.link)}
            style={{ cursor: 'pointer' }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
