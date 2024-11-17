import React, { useState, useEffect } from 'react';
import ServiceCard from './component/ServiceCard';
import '../../styles/giftcard/GiftCardPage.css';
import axios from 'axios';

const GiftCardsPage = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of services per page

  useEffect(() => {
    // Fetching data from the API
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST || 'http://localhost:3000'}/v1/services/promotion`);
        setServices(response.data.data); // Assuming the API response is in the format `{ data: [...] }`
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

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
        {currentServices.map((service) => (
          <ServiceCard
          key={service.id}
          title={service.name}
          price={service.price}
          oldPrice={service.discountPercentage ? (service.price / (1 - service.discountPercentage / 100)).toFixed(2) : null}
          image={service.imageMain}
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
