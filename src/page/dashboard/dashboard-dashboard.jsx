import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/dashboard/dashboard.css';
import totalBookingIcon from '../../image/totalBooking.png';
import totalStaffIcon from '../../image/staffCount.png';
import totalServicesIcon from '../../image/totalServices.png';
import totalOngoingIcon from '../../image/onGoing.png';
import BookingChart from './chart-dashboard';


const ServiceMenu = () => {
    // const ongoingCount=5;
    // const [loading, setLoading] = useState(true);
    // const [totalBooking, setTotalBooking] = useState({
    //     totalBooking: null
    // });
    // const [totalStaff, setTotalStaff] = useState({
    //     totalStaff: null
    // });
    // const [totalServices, setTotalServices] = useState({
    //     totalServices: null
    // });
    // const [data, setData] = useState({
    //     totalBooking: null,
    //     staff: null,
    //     totalServices: null,
    //     ongoing: 0,
    // });

    // useEffect(() => {
    //     const fetchTotalBooking = async () => {
    //         setLoading(true);
    //         try {
    //             const bookingsResponse = await axios.get('http://localhost:3001/dashboard/booking-count');
    //             const staffResponse  = await axios.get('http://localhost:3001/dashboard/staff-count');
    //             const ongoingResponse  = await axios.get('http://localhost:3001/dashboard/services-count');
    //             console.log('API Response:', response.data);
    //             setTotalBooking(prevData => ({
    //                 ...prevData,
    //                 totalBookings: response.data.totalBookings,
    //             }));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    
    //     const fetchTotalStaff = async () => {
    //         try {
                
    //             console.log('API Response:', response.data);
    //             setTotalStaff(prevData => ({
    //                 ...prevData,
    //                 totalStaff: response.data.totalStaff,
    //             }));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     const fetchTotalServices = async () => {
    //         try {
                
    //             console.log('API Response:', response.data);
    //             setTotalServices(prevData => ({
    //                 ...prevData,
    //                 totalServices: response.data.totalServices,
    //             }));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    
    //     fetchTotalBooking();
    //     fetchTotalStaff();
    //     fetchTotalServices();
    // }, []);
    const [data, setData] = useState({
        totalBookings: null,
        totalStaff: null,
        totalServices: null,
        // ongoing: 0,
    });
    const ongoingCount=5;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Gọi API cho totalBookings
            const bookingsResponse = await axios.get('http://localhost:3001/dashboard/booking-count');
            const staffResponse = await axios.get('http://localhost:3001/dashboard/staff-count');
            const servicesResponse = await axios.get('http://localhost:3001/dashboard/services-count');
            // const ongoingResponse = await axios.get('http://localhost:3001/dashboard/ongoing-count');

            setData({
                totalBookings: bookingsResponse.data.totalBookings,
                totalStaff: staffResponse.data.totalStaff,
                totalServices: servicesResponse.data.totalServices,
                // ongoing: ongoingResponse.data.ongoing,
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
                        <img src={totalOngoingIcon} alt="Ongoing Icon" />
                    </div>
                    <span>Ongoing</span>
                    <span>{ongoingCount || 'No data available'}</span>
                </div>
            </div>
            <div className="booking-chart">
                <BookingChart/>
            </div>
        </div>
    );
};

export default ServiceMenu;
