import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/booking/component/BookingCard.css';

const BookingCard = ({ 
    selectedDate, 
    setSelectedDate, 
    selectedTime, 
    setSelectedTime,
    timeSlots,
    onNext 
}) => {
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

            <button className="next-btn" onClick={onNext}>Next</button>
        </div>
    );
};

export default BookingCard;