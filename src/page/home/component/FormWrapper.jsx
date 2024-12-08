import React, { useState } from 'react';
import ServiceForm from './ServiceForm';
import BookingCard from '../../booking/components/BookingCard';
import AppointmentSummary from '../../booking/components/ThirdStep'; // Import AppointmentSummary component

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
                />
            )}
        </div>
    );
};

export default FormWrapper;
