import React, { useState } from 'react';
import ServiceCard from './component/ServiceCard';
import '../../styles/giftcard/GiftCardPage.css';

import massageImg from '../../images/gall1.svg';
import spaImg from '../../images/gall1.svg';
import bodycareImg from '../../images/gall1.svg';
import facialImg from '../../images/gall1.svg';
import facecareImg from '../../images/gall1.svg';
import oilwrapImg from '../../images/gall1.svg';

const GiftCardsPage = () => {
  const services = [
    { title: 'Massage', price: 55, image: massageImg },
    { title: 'Basic SPA', price: 55, image: spaImg },
    { title: 'Body Care', price: 35, oldPrice: 80, image: bodycareImg },
    { title: 'Facial Massage', price: 55, image: facialImg },
    { title: 'Face Care', price: 35, oldPrice: 80, image: facecareImg },
    { title: 'Oil Wrap', price: 55, image: oilwrapImg },
    { title: 'Massage', price: 55, image: massageImg },
    { title: 'Basic SPA', price: 55, image: spaImg },
    { title: 'Body Care', price: 35, oldPrice: 80, image: bodycareImg },
    { title: 'Facial Massage', price: 55, image: facialImg },
    { title: 'Face Care', price: 35, oldPrice: 80, image: facecareImg },
    { title: 'Oil Wrap', price: 55, image: oilwrapImg },
  ];

  const itemsPerPage = 9; // Number of services per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(services.length / itemsPerPage);

  // Get the services for the current page
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="gift-cards-container-gallery">
      <div className="hero-section-gallery">
        <h1>Gift Cards</h1>
      </div>

      <div className="services-grid-gallery">
        {currentServices.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            price={service.price}
            oldPrice={service.oldPrice}
            image={service.image}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-gallery">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button-gallery"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button-gallery ${currentPage === index + 1 ? 'active-gallery' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button-gallery"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GiftCardsPage;
