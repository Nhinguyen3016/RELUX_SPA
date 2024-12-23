import React, { useState, useEffect } from 'react';
import '../../styles/dashboard/dashboard.css';
import axios from 'axios';
import totalBookingIcon from '../../image/totalBooking.png';
import totalStaffIcon from '../../image/staffCount.png';
import totalServicesIcon from '../../image/totalServices.png';
import totalIcon from '../../image/onGoing.png';
import BookingChart from './chart-dashboard';

const API_BASE_URL = 'http://localhost:3003/dashboard';

const DashboardMenu = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [data, setData] = useState({
        totalBookings: null,
        totalStaff: null,
        totalServices: null,
        total: null,
    });


    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const bookingsResponse = await axios.get(`${API_BASE_URL}/totalBooking`);
            const staffResponse = await axios.get(`${API_BASE_URL}/totalStaff`);
            const servicesResponse = await axios.get(`${API_BASE_URL}/totalService`);
            const totalResponse = await axios.get(`${API_BASE_URL}/sumTotal`);

            setData({
                totalBookings: bookingsResponse.data.count[0].totalBookings,
                totalStaff: staffResponse.data.count[0].totalStaff,
                totalServices: servicesResponse.data.count[0].totalService,
                total: totalResponse.data.sumTotal[0].SumTotal,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Unable to fetch data, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard">
            <div className="stats">
                <div className="stat-item">
                    <div className="icon">
                        <img src={totalBookingIcon} alt="Booking Icon" />
                    </div>
                    <span>Total Booking</span>
                    <span>{data.totalBookings !== null ? data.totalBookings : 'No data available'}</span>
                </div>
                <div className="stat-item">
                    <div className="icon">
                        <img src={totalStaffIcon} alt="Staff Icon" />
                    </div>
                    <span>Staff</span>
                    <span>{data.totalStaff !== null ? data.totalStaff : 'No data available'}</span>
                </div>
                <div className="stat-item">
                    <div className="icon">
                        <img src={totalServicesIcon} alt="Services Icon" />
                    </div>
                    <span>Total Services</span>
                    <span>{data.totalServices !== null ? data.totalServices : 'No data available'}</span>
                </div>
                <div className="stat-item">
                    <div className="icon">
                        <img src={totalIcon} alt="Total Icon" />
                    </div>
                    <span>Revenue</span>
                    <span>{data.total !== null ? data.total : 'No data available'}</span>
                </div>
            </div>
            <div className="booking-chart">
                <BookingChart/>
            </div>
        </div>
    );
};

export default DashboardMenu;
