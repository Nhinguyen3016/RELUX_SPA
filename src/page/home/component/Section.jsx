import React, { useState } from 'react';
import '../../../styles/home/Section.css';
import spaImage from '../../../images/spaRoom.png';
import modelImage from '../../../images/modelImage.png';
import ServiceForm from './ServiceForm';
import BookingCard from '../../booking/components/BookingCard'; 

const Section = () => {
  const [isServiceForm, setIsServiceForm] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = (formData) => {
    console.log("Form Data:", formData);
    setIsServiceForm(false); // Chuyển sang BookingCard
  };

  return (
    <div className="section-container">
      <div className="upper-section">
        <div className="text-block">
          <p>Hi, nice to meet you in spa</p>
        </div>
        <img src={modelImage} alt="Spa Room" className="spa-image" />
      </div>
      <div className="lower-section">
        <div className="model-container">
          <img src={spaImage} alt="Model" className="model-image" />
        </div>
        <div className="form-wrapper">
          {isServiceForm ? (
            <ServiceForm onSubmit={handleNext} />
          ) : (
            <BookingCard
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              onNext={() => console.log("Next step!")}
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default Section;
