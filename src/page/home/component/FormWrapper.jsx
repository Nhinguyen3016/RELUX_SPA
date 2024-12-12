import React, { useState } from 'react';
import ServiceForm from './ServiceForm';
import BookingCard from '../../booking/components/BookingCard';
import AppointmentSummary from '../../booking/components/ThirdStep'; 
import FourStep from '../../booking/components/FourStep'; 
import FiveStep from '../../booking/components/FiveStep'; 
const FormWrapper = ({
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime
}) => {
    const [currentStep, setCurrentStep] = useState(0); // State to track the current step
    const [selectedEmployee, setSelectedEmployee] = useState(""); // Manage selected employee in FormWrapper

    const handleNext = () => {
        setCurrentStep(prevStep => prevStep + 1); // Move to the next step
    };

    const handleBack = () => {
        setCurrentStep(prevStep => prevStep - 1); // Go back to the previous step
    };



    return (
        <div className="form-wrapper">
            {currentStep === 0 && (
                <ServiceForm
                    onSubmit={handleNext}
                    setSelectedEmployee={setSelectedEmployee} // Pass setSelectedEmployee to ServiceForm
                />
            )}
            {currentStep === 1 && (
                <BookingCard
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    onNext={handleNext}
                    onBack={handleBack}
                    selectedEmployee={selectedEmployee} // Pass selectedEmployee to BookingCard
                />
            )}
            {currentStep === 2 && (
                <AppointmentSummary
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    selectedEmployee={selectedEmployee} // Pass selectedEmployee to AppointmentSummary
                    onBack={handleBack}
                    onNext={handleNext}
                />
            )}
            {currentStep === 3 && (
                <FourStep
                    onNext={handleNext}  // Pass onNext to FourStep
                    onBack={handleBack}  // Pass onBack to FourStep
                />
            )}
             {currentStep === 4 && (
                <FiveStep
                onBack={handleBack} 
                />
            )}
        </div>
    );
};

export default FormWrapper;
