import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import BookingCard from './component/BookingCard';
import Spa from '../../images/spa.png';
import '../../styles/booking/BookingPage.css';

const BookingPage = () => {
    const location = useLocation(); // Get the location object
    const serviceData = location.state; // Retrieve the passed data

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);

    const timeSlots = [
        "8:00 am", "8:30 am", "9:00 am", "9:30 am",
        "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm"
    ];

    const handleNext = () => {
        // Handle next button click
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
    };

    return (
        <div className="container">
            <div className="banner-image">
                <img
                    src={Spa}
                    alt="Spa atmosphere"
                    className="w-full h-48 object-cover rounded-lg"
                />
            </div>
            <div className="header-1">
                <h1>{serviceData?.name}</h1>
            </div>

            <div className="grid-container">
                <BookingCard
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    timeSlots={timeSlots}
                    onNext={handleNext}
                />

                <div className="content-section">
                    <h2>Description</h2>
                    <p>{serviceData?.description1}</p>
                    <img
                        src={serviceData?.imageDescription}
                        alt="Service description"
                        className="mt-5"
                    />
                    <p>{serviceData?.description2}</p>
                </div>

                <div className="details">
                    <h2>Details</h2>
                    <ul>
                        <li>Price: ${serviceData?.price}</li>
                        <li>Duration: {serviceData?.duration} mins</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
