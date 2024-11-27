import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/dashboard/booking-dashboard.css';

const API_BASE_URL = 'http://localhost:3003/dashboard/booking';

const BookingStatistics = () => {
    const [statisticsBooking, setStatisticsBooking] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const fetchStactisBooking = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/count-booking`);
            console.log('Full API Response:', response);
            console.log('Response data:', response.data);
            console.log('Service Quantities:', response.data.serviceQuantities);
            
            // Kiểm tra 2 điều kiện:
            // 1. response.data tồn tại
            // 2. response.data.serviceQuantities là một mảng
            if (response.data && Array.isArray(response.data.serviceQuantities)) {
                // Nếu dữ liệu hợp lệ, cập nhật state với mảng serviceQuantities
                setStatisticsBooking(response.data.serviceQuantities);
            } else {
                console.error('Invalid data format received:', response.data);
                setStatisticsBooking([]); // Set empty array if data is invalid
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setStatisticsBooking([]); // Set empty array on error
        }
    };
    const fetchAppointment = async () => {

        try{
            const response= await axios.get(`${API_BASE_URL}/servicesBooking`);
            setAppointments(response.data.serviceBooking);

        }catch (error) {
            console.error('Error fetching data:', error);
            setAppointments([]); // Set empty array on error
        }
    }


    useEffect(() => {
        fetchStactisBooking();
        fetchAppointment();
    }, []);
    
    return (
        <div>
            <div className='card'>
            <h2 className='booking-title'>Static on booked services</h2>
            <ul className='list'>
            {statisticsBooking && statisticsBooking.length > 0 ? (
                    statisticsBooking.map((item, index) => (
                        <li key={index}>
                            <span>{item.ServiceName}</span>
                            <span>{item.TotalBookings} guests</span>
                        </li>
                    ))
                ) : (
                    <li>No data available</li>
                )}
            </ul>
        </div>
        <div className="appointment-container">
            <div class="card-a">
                {appointments && appointments.length>0 ?(
                    appointments.map((item, index) => (
                    <div className="appointment-card" key={index}>
                        <h4>Client: {item.CustomerName}</h4>
                        <p><span className="detail-label1">Service:</span>{item.ServiceName}</p>
                        <p><span className="detail-label1">Date:</span> {item.BookingDate}</p>
                        <p><span className="detail-label1">Time:</span> {item.BookingTime}</p>  
                        {/* <div className="button-container">
                            <button className="button confirm">Confirm</button>
                            <button className="button cancel">Cancel</button>
                        </div> */}
                    </div>
                ))
                ) : (
                    <li>No data available</li>
                )}
            </div>
        </div>
        </div>
    );
};

export default BookingStatistics;
