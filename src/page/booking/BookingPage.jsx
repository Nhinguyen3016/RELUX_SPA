import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/booking/BookingPage.css';
import Spa from '../../images/spa.png';

const BookingPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);

    const timeSlots = [
        "8:00 am", "8:30 am", "9:00 am", "9:30 am",
        "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm"
    ];

    const CustomHeader = ({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
    }) => {
        const currentDate = new Date();
        const isCurrentMonth = date.getMonth() === currentDate.getMonth()
            && date.getFullYear() === currentDate.getFullYear();

        return (
            <div className="custom-header">
                <button
                    onClick={decreaseMonth}
                    disabled={isCurrentMonth}
                    className="month-nav-btn"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <span className="month-year">
                    {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    className="month-nav-btn"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        );
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
                <h1>2 Day Programs</h1>
            </div>

            <div className="grid-container">
                <div className="booking-card">
                    <div className="calendar-header">
                        <h3>Select Date & Time</h3>
                    </div>

                    <div className="calendar">
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            inline
                            renderCustomHeader={CustomHeader}
                            calendarClassName="custom-calendar"
                            minDate={new Date()}
                            dayClassName={date => {
                                if (date < new Date().setHours(0, 0, 0, 0)) {
                                    return 'past-day';
                                }
                                return date.getDate() === selectedDate?.getDate() &&
                                    date.getMonth() === selectedDate?.getMonth()
                                    ? 'selected-day'
                                    : undefined;
                            }}
                        />
                    </div>

                    <div className="time-slots">
                        {timeSlots.map(time => (
                            <button
                                key={time}
                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>

                    <button className="next-btn">Next</button>
                </div>

                <div className="content-section">
                    <h2>Atmosphere</h2>
                    <p>
                        When you think of a spa, you probably think of massages and cucumbers on your eyes.
                        Well, there are actually several different kinds of spas that offer different spa
                        packages and services to their clients. What is a day spa? Let's investigate.
                    </p>

                    <p>
                        Compared to other types of spas, day spas focus mostly on relaxation, well-being,
                        beauty, health, and tranquility. According to Trip Savvy, about 80% of spas are
                        considered day spas. Day spas put an emphasis on quiet, tranquil spaces and do
                        their best to keep the feeling of "business" out of the facility.
                    </p>
                    <img 
                        src={Spa} 
                        alt="Spa atmosphere" 
                        className=" mt-5"
                    />

                    <h2>Services</h2>
                    <p>
                        Day spas offer a variety of services, and the services offered depends on each
                        facility. Typically, however, day spas offer things like facials, massages,
                        manicures/pedicures, aromatherapy, stone massage, reflexology, and mud wraps.
                    </p>
                </div>

                <div className="details">
                    <h2>Details</h2>
                    <ul>
                        <li>Price: 25$</li>
                        <li>Duration: 1h 30m</li>
                        <li>Capacity: 1</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;