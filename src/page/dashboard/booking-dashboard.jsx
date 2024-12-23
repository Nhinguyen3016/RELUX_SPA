import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/dashboard/booking-dashboard.css';

const API_BASE_URL = 'http://localhost:3003/dashboard';

const BookingStatistics = () => {
    const [statisticsBooking, setStatisticsBooking] = useState([]);
    const [pendingBooking, setPendingBooking] = useState([]);
    const [inProgressBooking, setInProgressBooking] = useState([]);
    const [completedBooking, setCompletedBooking] = useState([]);
    const [activeTab, setActiveTab] = useState('inProgress');

    // Fetch statistics
    const fetchStatisticsBooking = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/booking/count-booking`);
            if (response.data && Array.isArray(response.data.serviceQuantities)) {
                setStatisticsBooking(response.data.serviceQuantities);
            } else {
                console.error('Invalid data format received:', response.data);
                setStatisticsBooking([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setStatisticsBooking([]);
        }
    };
    // Fetch Pending Booking
    const fetchPendingBooking = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/booking/pending`);
            setPendingBooking(response.data.serviceBookingPending);
        } catch (error) {
            console.error('Error fetching pending booking:', error);
            setPendingBooking([]);
        }
    };

    // Fetch InProgress Booking
    const fetchInProgressBooking = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/booking/inprogress`);
            setInProgressBooking(response.data.serviceBookingInProgress);
        } catch (error) {
            console.error('Error fetching in-progress booking:', error);
            setInProgressBooking([]);
        }
    };

    // Fetch Completed Booking
    const fetchCompletedBooking = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/booking/completed`);
            setCompletedBooking(response.data.serviceBookingCompleted);
        } catch (error) {
            console.error('Error fetching completed booking:', error);
            setCompletedBooking([]);
        }
    };

    useEffect(() => {
        fetchStatisticsBooking();
        fetchPendingBooking();
        fetchInProgressBooking();
        fetchCompletedBooking();
    }, []);

    // Render appointments by tab
    const renderAppointments = (data) => {
        return (
            <div className="appointment-container">
                <div class="card-a">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div className="appointment-card" key={index}>
                            <h4>Client: {item.CustomerName}</h4>
                            <p> <span className="detail-label1">Service: </span>{item.ServiceName}</p>
                            <p> <span className="detail-label1">Date: </span>{item.BookingDate}</p>
                            <p><span className="detail-label1">Time: </span>{item.BookingTime}</p>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
                </div>
            </div>
        )
    };
    

    return (
        <div>

            <div className="card">
                <h2 className="booking-title">Statistics on Booked Services</h2>
                <ul className="list">
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


            <div className="tabs">
                <button
                    className={activeTab === 'pending' ? 'active' : ''}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending
                </button>
                <button
                    className={activeTab === 'inProgress' ? 'active' : ''}
                    onClick={() => setActiveTab('inProgress')}
                >
                    In Progress
                </button>
                <button
                    className={activeTab === 'completed' ? 'active' : ''}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed
                </button>
            </div>

            <div className="appointment-container">
                {activeTab === 'pending' && renderAppointments(pendingBooking)}
                {activeTab === 'inProgress' && renderAppointments(inProgressBooking)}
                {activeTab === 'completed' && renderAppointments(completedBooking)}
            </div>
        </div>
    );
};

export default BookingStatistics;
