import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/dashboard/booking-dashboard.css';

const BookingStatistics = () => {
    const appointments = [
        {
            client: 'Emily Johnson',
            service: 'Haircut',
            date: 'October 15, 2023',
            time: '2:00 PM',
        },
        {
            client: 'Michael Brown',
            service: 'Massage',
            date: 'October 16, 2023',
            time: '3:30 PM',
        },
        {
            client: 'Sarah Smith',
            service: 'Facial Treatment',
            date: 'October 17, 2023',
            time: '1:00 PM',
        },
        {
            client: 'John Doe',
            service: 'Manicure',
            date: 'October 18, 2023',
            time: '4:00 PM',
        },
        {
            client: 'Emily Johnson',
            service: 'Haircut',
            date: 'October 15, 2023',
            time: '2:00 PM',
        },
        {
            client: 'Michael Brown',
            service: 'Massage',
            date: 'October 16, 2023',
            time: '3:30 PM',
        },
        {
            client: 'Sarah Smith',
            service: 'Facial Treatment',
            date: 'October 17, 2023',
            time: '1:00 PM',
        },
        {
            client: 'John Doe',
            service: 'Manicure',
            date: 'October 18, 2023',
            time: '4:00 PM',
        },
        {
            client: 'Emily Johnson',
            service: 'Haircut',
            date: 'October 15, 2023',
            time: '2:00 PM',
        },
        {
            client: 'Michael Brown',
            service: 'Massage',
            date: 'October 16, 2023',
            time: '3:30 PM',
        },
        {
            client: 'Sarah Smith',
            service: 'Facial Treatment',
            date: 'October 17, 2023',
            time: '1:00 PM',
        },
        {
            client: 'John Doe',
            service: 'Manicure',
            date: 'October 18, 2023',
            time: '4:00 PM',
        },
    ];
    const [stactisBooking, setStactisBooking] = useState({
        stactisBooking: []
    });

    useEffect(() => {
        const fetchStactisBooking = async () => {
            try {
                const response = await axios.get('http://localhost:3001/dashboard/statis-booking');
                console.log('API Response:', response.data);
                const data = response.data.statisBooking || [];
                setStactisBooking(data);
            } catch (error) {
                console.error('Error fetching data:', error);   	
            }
        };
    
        fetchStactisBooking();
    }, []);
    
    return (
        <div>
            <div className='card'>
            <h2 className='booking-title'>Static on booked services</h2>
            <ul className='list'>
            {stactisBooking.length > 0 &&
                stactisBooking.map((item, index) => (
                    <li key={index}>
                        <span>{item.Name}</span>
                        <span>{item.Quantity} guests</span>
                    </li>
            ))}
            </ul>
        </div>
        <div className="appointment-container">
            <div class="card-a">
                {appointments.map((appointment, index) => (
                    <div className="appointment-card" key={index}>
                        <h4>Client: {appointment.client}</h4>
                        <p><span className="detail-label1">Service:</span>{appointment.service}</p>
                        <p><span className="detail-label1">Date:</span> {appointment.date}</p>
                        <p><span className="detail-label1">Time:</span> {appointment.time}</p>  
                        {/* <div className="button-container">
                            <button className="button confirm">Confirm</button>
                            <button className="button cancel">Cancel</button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default BookingStatistics;
