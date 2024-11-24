import React, { useEffect, useState } from 'react'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/booking/component/BookingCard.css';
import axios from 'axios';

const BookingCard = ({ 
    selectedDate, 
    setSelectedDate, 
    selectedTime, 
    setSelectedTime,
    onNext,
    selectedEmployee // Pass the selected employee ID from parent
}) => {
    const [employeeWorkingHours, setEmployeeWorkingHours] = useState([]);
    
    // Default time slots
    const timeSlots = [
        "8:00 am", "8:30 am", "9:00 am", "9:30 am", 
        "10:00 am", "10:30 am", "11:00 am", "11:30 am", 
        "12:00 pm", "1:00 pm", "1:30 pm", "2:00 pm", 
        "2:30 pm", "3:00 pm", "3:30 pm", "4:00 pm", 
        "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm", 
        "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm"
    ];

    // Fetch employee working hours when the employee is selected
    useEffect(() => {
        if (selectedEmployee) {
            const fetchEmployeeWorkingHours = async () => {
                try {
                    // Get the token from localStorage
                    const token = localStorage.getItem('authToken');
                    const response = await axios.get(`${process.env.REACT_APP_API_HOST}/v1/employees/${selectedEmployee}/working-hours`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in headers
                        },
                    });
                    setEmployeeWorkingHours(response.data || []);
                } catch (error) {
                    console.error("Error fetching employee working hours:", error);
                }
            };

            fetchEmployeeWorkingHours();
        }
    }, [selectedEmployee]);

    // Filter time slots based on employee's working hours
    const filteredTimeSlots = timeSlots.filter(timeSlot => {
        return employeeWorkingHours.includes(timeSlot);
    });

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
                {filteredTimeSlots.length > 0 ? filteredTimeSlots.map(time => (
                    <button
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </button>
                )) : (
                    <p>No available time slots for this employee</p>
                )}
            </div>

            <button className="next-btn" onClick={onNext}>Next</button>
        </div>
    );
};

export default BookingCard;
