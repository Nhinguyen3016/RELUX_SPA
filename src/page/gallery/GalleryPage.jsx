import React, { useState, useEffect } from 'react';
import '../../styles/gallery/GalleryPage.css';

// Image imports remain the same
import gall0 from "../../images/gall0.svg";
import gall1 from "../../images/gall1.svg";
import gall2 from "../../images/gall2.svg";
import gall3 from "../../images/gall3.svg";
import gall4 from "../../images/gall4.svg";
import gall5 from "../../images/gall5.svg";
import gall6 from "../../images/gall6.svg";
import gall7 from "../../images/gall7.svg";
import gall8 from "../../images/gall8.svg";
import gall9 from "../../images/gall9.svg";
import gall10 from "../../images/gall10.svg";
import gall11 from "../../images/gall11.svg";
import gall12 from "../../images/gall12.svg";

const galleryImages = [
  { src: gall1, alt: "Gallery Image 1" },
  { src: gall5, alt: "Gallery Image 5" },
  { src: gall9, alt: "Gallery Image 9" },
  { src: gall2, alt: "Gallery Image 2" },
  { src: gall6, alt: "Gallery Image 6" },
  { src: gall10, alt: "Gallery Image 10" },
  { src: gall3, alt: "Gallery Image 3" },
  { src: gall7, alt: "Gallery Image 7" },
  { src: gall11, alt: "Gallery Image 11" },
  { src: gall4, alt: "Gallery Image 4" },
  { src: gall8, alt: "Gallery Image 8" },
  { src: gall12, alt: "Gallery Image 12" }
];

const ImageModal = ({ image, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isZoomed]);

  if (!image) return null;

  const handleImageClick = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleOverlayClick = () => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img 
          src={image.src} 
          alt={image.alt} 
          className={isZoomed ? 'zoomed' : ''} 
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; 
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; 
  };

  return (
    <div className="gallery-page">
      <div className="gallery-hero" style={{ backgroundImage: `url(${gall0})` }}>
        <h1 className="gallery-title">Gallery</h1>
      </div>
      <div className="gallery-container">
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => handleImageClick(image)}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
      <ImageModal 
        image={selectedImage} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default GalleryPage;