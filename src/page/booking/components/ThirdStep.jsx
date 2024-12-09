import React, { useState, useEffect } from 'react';
import '../../../styles/booking/component/ThirdStep.css';

const AppointmentSummary = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    console.log('Appointments fetched from localStorage:', savedAppointments); // Debugging

    if (savedAppointments.length > 0) {
      setAppointments(savedAppointments);
    } else {
      console.log('No appointments found in localStorage.');
    }
  }, []);

  // Save appointments to localStorage whenever it changes
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  const handleRemoveAppointment = (id) => {
    const updatedAppointments = appointments.filter(app => app.id !== id);
    setAppointments(updatedAppointments);
  };

  const calculateTotal = () => {
    return appointments.reduce((sum, app) => {
      const discount = app.discountPercentage || 0;
      const discountedPrice = app.price - (app.price * (discount / 100));
      return sum + discountedPrice;
    }, 0);
  };

  return (
    <div className="appointment-summary-container-thirdstep">
      <h1 className="main-title-thirdstep">Make an Appointment</h1>

      {/* Kiểm tra nếu appointments có dữ liệu */}
      {appointments.length === 0 ? (
        <p>No appointments found. Please make a booking first.</p> // Nếu không có cuộc hẹn
      ) : (
        appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card-thirdstep">
            <h2 className="service-title-thirdstep">{appointment.service}</h2>
            <p className="datetime-thirdstep">{appointment.selectedDate}, {appointment.selectedTime}</p>

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
                  <h3>Original Price</h3>
                  <p>${appointment.price}</p>
                </div>

                <div className="detail-group-thirdstep">
                  <h3>Discount</h3>
                  <p>{appointment.discountPercentage ? `${appointment.discountPercentage}%` : 'No Discount'}</p>
                </div>

                <div className="detail-group-thirdstep">
                  <h3>Discounted Price</h3>
                  <p>${(appointment.price - (appointment.price * (appointment.discountPercentage || 0) / 100)).toFixed(2)}</p>
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
        ))
      )}

      <div className="divider-thirdstep"></div>

      <div className="total-section-thirdstep">
        <h3>Total : ${calculateTotal().toFixed(2)}</h3>
      </div>

      <div className="action-buttons-thirdstep">
        <button className="add-more-button-thirdstep">Add More</button>
        <button className="next-button-thirdstep">Next</button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
