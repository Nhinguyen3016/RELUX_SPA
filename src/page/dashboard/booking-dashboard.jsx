import React from 'react';
import '../../styles/dashboard/booking-dashboard.css';

const BookingStatistics = () => {
    const services = [
        { name: 'Facial Treatment', guests: 15 },
        { name: 'Acne Squeezing', guests: 25 },
        { name: 'Body Massage', guests: 10 },
        { name: 'Manicure', guests: 5 },
        { name: 'Body Massage', guests: 10 },
        { name: 'Manicure', guests: 5 },
    ];
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

    return (
        <div>
            <div className='card'>
            <h2 className='booking-title'>Statistics on booked services</h2>
            <ul className='list'>
                {services.map((service, index) => (
                    <li key={index}>
                        <span>{service.name}</span>
                        <span>{service.guests} guests</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="appointment-container">
            <div class="card-a">
                {appointments.map((appointment, index) => (
                    <div className="appointment-card" key={index}>
                        <h4>Client: {appointment.client}</h4>
                        <p>Service: {appointment.service}</p>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.time}</p>
                        <div className="button-container">
                            <button className="button confirm">Confirm</button>
                            <button className="button cancel">Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default BookingStatistics;
