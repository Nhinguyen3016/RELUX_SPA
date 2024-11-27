import React, { useState } from 'react';
import '../../../styles/home/Section.css';
import spaImage from '../../../images/spaRoom.png';
import modelImage from '../../../images/modelImage.png';
import FormWrapper from './FormWrapper'; // Import FormWrapper component

const Section = React.forwardRef((props, ref) => {
  const [isServiceForm, setIsServiceForm] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State cho selectedEmployee

  const handleNext = (formData) => {
    console.log("Form Data:", formData);
    setIsServiceForm(false); 
    setSelectedEmployee(formData.employee); 
  };

  const handleBack = () => {
    setIsServiceForm(true); // Quay lại ServiceForm
  };

  return (
    <div className="section-container" >
      <div className="upper-section">
        <div className="text-block">
          <p>Hi, nice to meet you in spa</p>
        </div>
        <img src={modelImage} alt="Spa Room" className="spa-image" />
      </div>
      <div className="lower-section" ref={ref}>
        <div className="model-container">
          <img src={spaImage} alt="Model" className="model-image" />
        </div>
        {/* Thay thế phần kiểm tra điều kiện bằng FormWrapper */}
        <div className="service-form" >
          <FormWrapper 
            isServiceForm={isServiceForm} 
            handleNext={handleNext}
            onBack={handleBack}  // Thêm handleBack vào FormWrapper
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedEmployee={selectedEmployee} 
          />
        </div>
      </div>
    </div>
  );
});

export default Section;
