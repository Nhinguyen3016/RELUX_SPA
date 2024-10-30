import React from 'react';
import './Book.css';
import backgroundImage from '../../images/bookNow.jpg';

const BookService = () => {
    return (
        <div className="book-the-service-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h2>Book the Service Now</h2>
            <button className="book-appointment-button">Book an appointment</button>
        </div>
    );
};

export default BookService;
