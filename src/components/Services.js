import React from 'react';
import '../styles/Services.css';

const servicesData = [
  {
    title: 'Facials',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '💆‍♀️',
  },
  {
    title: 'SPA Programs',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '🧖‍♀️',
  },
  {
    title: 'Massages',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '💆‍♂️',
  },
  {
    title: 'Body Treatments',
    description: 'Our crazy-talented master stylists will connect with you on a personal level',
    icon: '👣',
  },
];

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
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
