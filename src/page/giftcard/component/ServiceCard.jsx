import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/giftcard/component/ServiceCard.css';

const ServiceCard = ({ 
  title, 
  price, 
  oldPrice, 
  discountPercentage, 
  image, 
  description1, 
  description2, 
  imageDescription, 
  duration 
}) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    // Navigate to the booking page and pass the service details as state
    navigate(`/booking/${title}`, {
      state: {
        name: title,
        price: price,
        oldPrice: oldPrice,
        discountPercentage: discountPercentage,
        description1: description1,
        description2: description2,
        imageDescription: imageDescription,
        duration: duration,
      }
    });
  };

  return (
    <div className="service-card-g">
      <div className="service-content-g">
        <h3>{title}</h3>
        <div className="price-tag-g">
          <span className="current-price-g">{price}$</span>
          {oldPrice && <span className="old-price-g">{oldPrice}$</span>}
        </div>
        {/* Removed the discount section */}
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
