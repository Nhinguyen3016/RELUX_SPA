import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import FormWrapper from '../home/component/FormWrapper'; // Import FormWrapper
import Spa from '../../images/spa.png';
import '../../styles/booking/BookingPage.css';

const BookingPage = () => {
    const location = useLocation(); // Get the location object
    const serviceData = location.state; // Retrieve the passed data

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [isServiceForm, setIsServiceForm] = useState(true); // State for toggling forms
    const [selectedEmployee, setSelectedEmployee] = useState(null); // To capture employee data

    const handleNext = (formData) => {
        console.log("Form Data:", formData);
        setIsServiceForm(false);
        setSelectedEmployee(formData.employee);
    };

    return (
        <div className="container">
            {/* Banner Section */}
            <div className="banner-image">
                <img
                    src={Spa}
                    alt="Spa atmosphere"
                    className="w-full h-48 object-cover rounded-lg"
                />
            </div>

            {/* Header Section */}
            <div className="header-1">
                <h1>{serviceData.name}</h1>
            </div>

            {/* Main Grid Section */}
            <div className="grid-container">
                {/* Replacing BookingCard with FormWrapper */}
                <FormWrapper
                    isServiceForm={isServiceForm}
                    handleNext={handleNext}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    selectedEmployee={selectedEmployee}
                />

                {/* Content Section */}
                <div className="content-section">
                    <h2>Description</h2>
                    <p>{serviceData.description1}</p>
                    <img
                        src={serviceData.imageDescription}
                        alt="Service description"
                        className="mt-5"
                    />
                    <p>{serviceData.description2}</p>
                </div>

                {/* Details Section */}
                <div className="details">
                    <h2>Details</h2>
                    <ul>
                        <li>Price: ${serviceData.price}</li>
                        <li>Duration: {serviceData.duration} mins</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
