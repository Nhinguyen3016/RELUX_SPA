import React from 'react';
import '../../../styles/services/component/Book.css';
import backgroundImage from '../../../images/bookNow.jpg';

const BookService = () => {
    return (
        <div className="book-the-service-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        </div>
    );
};

export default BookService;