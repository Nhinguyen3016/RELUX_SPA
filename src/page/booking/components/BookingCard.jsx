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
    onBack
}) => {
    const [workSchedules, setWorkSchedules] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Local state for selected employee
    const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

    useEffect(() => {
        // Retrieve selectedEmployee from localStorage
        const employeeId = localStorage.getItem('selectedEmployeeId');
        if (employeeId) {
            setSelectedEmployee(employeeId);
            console.log('Selected Employee ID from localStorage:', employeeId);
            fetchWorkSchedules(employeeId);
        } else {
            console.log('No employee selected in localStorage');
        }

        // Retrieve previously selected date and time from localStorage
        const storedDate = localStorage.getItem('selectedDate');
        const storedTime = localStorage.getItem('selectedTime');
        
        if (storedDate) {
            setSelectedDate(new Date(storedDate));
        }
        if (storedTime) {
            setSelectedTime(storedTime);
        }
    }, []);

    useEffect(() => {
        // Save selected date and time to localStorage whenever they change
        if (selectedDate) {
            localStorage.setItem('selectedDate', selectedDate.toISOString());
        }
        if (selectedTime) {
            localStorage.setItem('selectedTime', selectedTime);
        }
    }, [selectedDate, selectedTime]);

    const fetchWorkSchedules = async (employeeId) => {
        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = `${API_HOST}/v1/employees/${employeeId}/work-schedules`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const schedules = response.data?.data || [];
            setWorkSchedules(schedules);
            setFetchError(null);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error fetching work schedules:", errorMessage);
            setFetchError(errorMessage);
        }
    };

    const getDayName = (date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    const mergeTimeSlots = (daySchedules) => {
        if (!daySchedules.length) return [];
        const sorted = daySchedules.sort((a, b) => 
            new Date(`2000-01-01 ${a.startTime}`).getTime() - 
            new Date(`2000-01-01 ${b.startTime}`).getTime()
        );

        const merged = [sorted[0]];
        for (let i = 1; i < sorted.length; i++) {
            const current = sorted[i];
            const last = merged[merged.length - 1];
            const lastEnd = new Date(`2000-01-01 ${last.endTime}`);
            const currentStart = new Date(`2000-01-01 ${current.startTime}`);

            if (currentStart <= lastEnd) {
                last.endTime = Math.max(
                    new Date(`2000-01-01 ${last.endTime}`).getTime(),
                    new Date(`2000-01-01 ${current.endTime}`).getTime()
                );
            } else {
                merged.push(current);
            }
        }
        return merged;
    };

    const convertTo12Hour = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const getAvailableTimeSlots = () => {
        if (!selectedDate || !workSchedules.length) return [];
        const dayName = getDayName(selectedDate);
        const daySchedules = workSchedules.filter(schedule => 
            schedule.dayOfWeek === dayName && schedule.isAvailable
        );

        const mergedSchedules = mergeTimeSlots(daySchedules);
        const availableSlots = new Set();
        mergedSchedules.forEach(schedule => {
            const start = new Date(`2000-01-01 ${schedule.startTime}`);
            const end = new Date(`2000-01-01 ${schedule.endTime}`);
            let current = new Date(start);

            while (current < end) {
                availableSlots.add(convertTo12Hour(current.toTimeString().slice(0, 5)));
                current.setMinutes(current.getMinutes() + 30);
            }
        });

        return timeSlots.filter(slot => availableSlots.has(slot));
    };

    const timeSlots = [
        "7:00 am","7:30 am","8:00 am", 
        "8:30 am", "9:00 am", "9:30 am", 
        "10:00 am", "10:30 am", "11:00 am", "11:30 am", 
        "12:00 pm", "1:00 pm", "1:30 pm", "2:00 pm", 
        "2:30 pm", "3:00 pm", "3:30 pm", "4:00 pm", 
        "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm", 
        "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm",
        "8:30 pm","9:00 pm"
    ];

    const getNext7Days = (startDate) => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const availableTimeSlots = getAvailableTimeSlots();
    const next7Days = getNext7Days(new Date());

    return (
        <div className="booking-card">
            <div className="calendar-header">
                <h3>Select Date & Time</h3>
                {fetchError && <div className="error-message">Error: {fetchError}</div>}
            </div>

            <div className="calendar">
                <DatePicker
                    selected={selectedDate}
                    onChange={date => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                        localStorage.removeItem('selectedTime'); // Clear time selection if date is changed
                    }}
                    inline
                    minDate={new Date()} // Disables past dates
                    maxDate={next7Days[next7Days.length - 1]} // Set maxDate to 7 days after the selected date
                    dayClassName={date => {
                        const dayName = getDayName(date);
                        return workSchedules.some(schedule => 
                            schedule.dayOfWeek === dayName && schedule.isAvailable
                        ) && date >= new Date() // Ensure the day is not in the past
                            ? '' 
                            : 'unavailable-day'; // Disable past days
                    }}
                />
            </div>

            <div className="time-slots">
                {selectedDate ? (
                    availableTimeSlots.length ? (
                        availableTimeSlots.map(time => (
                            <button 
                                key={time} 
                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))
                    ) : (
                        <p>No time slots available for this day</p>
                    )
                ) : (
                    <p>Please select a date first</p>
                )}
            </div>

            <div className="buttons">
                <button 
                    className="back-btn" 
                    onClick={onBack}
                >
                    Back
                </button>
                <button 
                    className="next-btn" 
                    onClick={onNext}
                    disabled={!selectedDate || !selectedTime}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookingCard;
