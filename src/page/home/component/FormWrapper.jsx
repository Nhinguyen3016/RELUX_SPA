import React from 'react';
import ServiceForm from './ServiceForm';
import BookingCard from '../../booking/components/BookingCard';

const FormWrapper = ({ 
    isServiceForm, 
    handleNext, 
    handleBack,  // Thêm hàm handleBack
    selectedDate, 
    setSelectedDate, 
    selectedTime, 
    setSelectedTime, 
    selectedEmployee 
}) => {
  return (
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
          onBack={handleBack}  // Truyền hàm handleBack
          selectedEmployee={selectedEmployee} 
        />
      )}
    </div>
  );
};

export default FormWrapper;
