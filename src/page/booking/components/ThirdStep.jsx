import React, { useState } from 'react';
import '../../../styles/booking/component/ThirdStep.css';

const AppointmentSummary = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      service: 'Ayurvedic Spa Program',
      date: 'October 17, 2024',
      time: '2:30 PM',
      location: '27 Thi Sach, Hai Chau, Da Nang',
      employee: 'Diana Milos',
      price: 49
    }
  ]);

  const handleRemoveAppointment = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  const calculateTotal = () => {
    return appointments.reduce((sum, app) => sum + app.price, 0);
  };

  return (
    <div className="appointment-summary-container-thirdstep">
      <h1 className="main-title-thirdstep">Make an Appointment</h1>

      {appointments.map(appointment => (
        <div key={appointment.id} className="appointment-card-thirdstep">
          <h2 className="service-title-thirdstep">{appointment.service}</h2>
          <p className="datetime-thirdstep">{appointment.date}, {appointment.time}</p>

          <div className="details-section-thirdstep">
            <div className="detail-group-thirdstep">
              <h3>Location</h3>
              <p>{appointment.location}</p>
            </div>

            <div className="info-row-thirdstep">
              <div className="detail-group-thirdstep">
                <h3>Employee</h3>
                <p>{appointment.employee}</p>
              </div>

              <div className="detail-group-thirdstep">
                <h3>Price</h3>
                <p>${appointment.price}</p>
              </div>
            </div>

            <button 
              className="remove-button-thirdstep"
              onClick={() => handleRemoveAppointment(appointment.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="divider-thirdstep"></div>

      <div className="total-section-thirdstep">
        <h3>Total : ${calculateTotal()}</h3>
      </div>

      <div className="action-buttons-thirdstep">
        <button className="add-more-button-thirdstep">Add More</button>
        <button className="next-button-thirdstep">Next</button>
      </div>
    </div>
  );
};

export default AppointmentSummary;