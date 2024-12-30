import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/booking/component/BookingCard.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

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
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
    const navigate = useNavigate();
    const {enqueueSnackbar}= useSnackbar();
    let schedules=[];
    useEffect(() => {
        // Check if the user is logged in
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            // alert('You are not logged in yet');
            enqueueSnackbar("You are not logged in yet",{variant: 'info'})
            navigate('/account');
            return;
        }

        const employeeId = localStorage.getItem('selectedEmployeeId');
        if (employeeId) {
            setSelectedEmployee(employeeId);
            console.log('Selected Employee ID from localStorage:', employeeId);
            fetchWorkSchedules(employeeId);
        } else {
            console.log('No employee selected in localStorage');
        }

        const storedDate = localStorage.getItem('selectedDate');
        const storedTime = localStorage.getItem('selectedTime');

        if (storedDate) {
            const [year, month, day] = storedDate.split('-').map(Number);
            setSelectedDate(new Date(year, month - 1, day));
        }
        if (storedTime) {
            setSelectedTime(storedTime);
        }
    }, [navigate]);

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            localStorage.setItem('selectedDate', formattedDate);
        }
        if (selectedTime) {
            localStorage.setItem('selectedTime', selectedTime);
        }
    }, [selectedDate, selectedTime]);

    const fetchWorkSchedules = async (employeeId) => {
        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = `${API_HOST}/v1/employees/${employeeId}/free-time`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            schedules = response.data?.data || [];
            console.log( response.data);
            setWorkSchedules(schedules);
           
            setFetchError(null); // Clear any previous errors
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Error fetching work schedules:", errorMessage);
            setFetchError(errorMessage); // Set the error message
        }
    };

    const convertTo12Hour = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const getAvailableTimeSlots = () => {
        console.log(schedules.data);
        if (!selectedDate || !workSchedules.length) return [];
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const daySchedules = workSchedules.filter(schedule=> schedule.date === formattedDate);
        console.log(schedules);
        const availableSlots = new Set();

        

        daySchedules.forEach(schedule => {
            const start = new Date(`2000-01-01T${schedule.startTime}:00`);
            const end = new Date(`2000-01-01T${schedule.endTime}:00`);
            let current = new Date(start);
            
           while (current < end) {
                availableSlots.add(convertTo12Hour(current.toTimeString().slice(0, 5)))
              
               current.setMinutes(current.getMinutes() + 30);
            }
        });
       console.log(availableSlots)
    //console.log(timeSlots.filter(slot => availableSlots.has(slot)))
        return timeSlots.filter(slot => availableSlots.has(slot));
    };

    const timeSlots = [
        "7:00 am", "7:15 am", "7:30 am", "7:45 am", 
        "8:00 am", "8:15 am", "8:30 am", "8:45 am", 
        "9:00 am", "9:15 am", "9:30 am", "9:45 am", 
        "10:00 am", "10:15 am", "10:30 am", "10:45 am", 
        "11:00 am", "11:15 am", "11:30 am", "11:45 am", 
        "12:00 pm", "12:15 pm", "12:30 pm", "12:45 pm", 
        "1:00 pm", "1:15 pm", "1:30 pm", "1:45 pm", 
        "2:00 pm", "2:15 pm", "2:30 pm", "2:45 pm", 
        "3:00 pm", "3:15 pm", "3:30 pm", "3:45 pm", 
        "4:00 pm", "4:15 pm", "4:30 pm", "4:45 pm", 
        "5:00 pm", "5:15 pm", "5:30 pm", "5:45 pm", 
        "6:00 pm", "6:15 pm", "6:30 pm", "6:45 pm", 
        "7:00 pm", "7:15 pm", "7:30 pm", "7:45 pm", 
        "8:00 pm", "8:15 pm", "8:30 pm", "8:45 pm", 
        "9:00 pm", "9:15 pm", "9:30 pm", "9:45 pm"
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

    const handleNext = () => {
        if (selectedDate && selectedTime) {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
    
            const timeParts = selectedTime.match(/(\d+):(\d+)\s*(am|pm)/i);
            let hours = parseInt(timeParts[1]);
            const minutes = timeParts[2];
            const period = timeParts[3].toLowerCase();
    
            if (period === 'pm' && hours < 12) hours += 12;
            if (period === 'am' && hours === 12) hours = 0;
    
            const formattedTime = `${String(hours).padStart(2, '0')}:${minutes}:00`;
    
            const dateTimeString = `${year}-${month}-${day}T${formattedTime}.000Z`;
    
            localStorage.setItem('selectedDateTime', dateTimeString);
        }
        onNext();
    };

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
                        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                        setSelectedDate(localDate);
                        setSelectedTime(null);
                        localStorage.removeItem('selectedTime');
                    }}
                    inline
                    minDate={new Date()}
                    maxDate={next7Days[next7Days.length - 1]}
                    
                    daClassName={date => {
                        console.log('Full date object:', date); // Lưu ý rằng `date` là đối tượng Date
                        const isAvailable = workSchedules.some(schedule => {

                            const formattedDate = date.toISOString().split('T')[0];
                            //console.log(formattedDate)
                            return schedule.date === formattedDate;
                        });
                    
                        return isAvailable ? '' : 'unavailable-day';
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
                <button className="back-btn" onClick={onBack}>Back</button>
                <button className="next-btn" onClick={handleNext} disabled={!selectedDate || !selectedTime}>Next</button>
            </div>
        </div>
    );
};

export default BookingCard;
