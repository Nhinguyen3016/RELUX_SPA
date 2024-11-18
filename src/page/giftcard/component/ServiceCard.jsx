import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/giftcard/component/ServiceCard.css';

const ServiceCard = ({ title, price, oldPrice, image }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booknow', { state: { serviceName: title } });
  };

  return (
    <div className="service-card-g">
      <div className="service-content-g">
        <h3>{title}</h3>
        <div className="price-tag-g">
          <span className="current-price-g">{price}$</span>
          {oldPrice && <span className="old-price-g">{oldPrice}$</span>}
        </div>
        <div className="service-image-g">
          <img src={image} alt={title} />
        </div>
      </div>
      <button className="book-button-g" onClick={handleBooking}>
        Book an appointment
      </button>
    </div>
  );
};

export default ServiceCard;
