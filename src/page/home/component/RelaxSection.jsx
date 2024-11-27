import React, { useState } from 'react';
import '../../../styles/home/RelaxSection.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Import the images
import mainImage from '../../../images/facialTreatment.png';
import relax1 from '../../../images/relax1.jpg';
import relax2 from '../../../images/relax2.jpg';
import relax3 from '../../../images/relax3.jpg';
import relax4 from '../../../images/relax4.jpg';
import relax5 from '../../../images/relax5.jpg';
import relax6 from '../../../images/relax6.jpg';
import relax7 from '../../../images/relax7.jpg';
import relax8 from '../../../images/relax8.jpg';

const RelaxSection = () => {
  // Array of images to display in the slider
  const images = [
    mainImage,
    relax1,
    relax2,
    relax3,
    relax4,
    relax5,
    relax6,
    relax7,
    relax8,
  ];

  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the left arrow click (previous image)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to handle the right arrow click (next image)
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relax-section">
      <h2 className="section-title-rl">Relax, Enjoy and Love Yourself</h2>
      <div className="image-container-home">
        <FaArrowLeft
          className="arrow left-arrow"
          onClick={handlePrev} // Move to the previous image
        />
        <img src={images[currentIndex]} alt="Relaxing Image" className="main-image" />
        <FaArrowRight
          className="arrow right-arrow"
          onClick={handleNext} // Move to the next image
        />
      </div>
    </div>
  );
};

export default RelaxSection;
