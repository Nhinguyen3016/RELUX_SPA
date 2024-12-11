// AppointmentSummary.js
import React, { useState, useEffect } from 'react';
import '../../../styles/booking/component/ThirdStep.css';

const AppointmentSummary = ({ onAddMore, onNext }) => {
  // State to manage appointments
  const [appointments, setAppointments] = useState([]);

  // Function to load appointments from local storage on component mount
  useEffect(() => {
    try {
      // Extract the appointment information from individual keys
      const appointment = {
        selectedDate: localStorage.getItem('selectedDate'),
        selectedTime: localStorage.getItem('selectedTime'),
        locationAddress: localStorage.getItem('locationAddress'),
        employeeName: localStorage.getItem('employeeName'),
        serviceName: localStorage.getItem('serviceName'),
        servicePrice: parseFloat(localStorage.getItem('servicePrice')) || 0,
        serviceDiscountPercentage: parseFloat(localStorage.getItem('serviceDiscountPercentage')) || 0,
        id: Date.now() // Generate a unique ID for this appointment
      };

      // Check if all the required fields exist and are not null/undefined
      const isCompleteData = Object.values(appointment).every(value => value !== null && value !== undefined);

      if (isCompleteData) {
        setAppointments([appointment]); // Save the appointment in the state as an array
      } else {
        console.warn('No appointment data found or data is incomplete.');
      }
    } catch (error) {
      console.error('Error loading appointment data from local storage:', error);
    }
  }, []);

  // Static function to calculate the total price
  const calculateTotal = () => {
    const bookingCount = parseInt(localStorage.getItem('bookingCount'), 10) || 0;

    return appointments.reduce((sum, app) => {
      const discount = app.serviceDiscountPercentage || 0;
      // If bookingCount >= 3, apply the discount, otherwise use the original price
      const priceToCharge = bookingCount >= 3
        ? app.servicePrice - (app.servicePrice * (discount / 100))
        : app.servicePrice;

      return sum + priceToCharge;
    }, 0);
  };

  // Function to handle the removal of an appointment
  const handleRemoveAppointment = (id) => {
    const updatedAppointments = appointments.filter(app => app.id !== id);
    setAppointments(updatedAppointments);

    // Clear localStorage if no appointments remain
    if (updatedAppointments.length === 0) {
      localStorage.removeItem('selectedDate');
      localStorage.removeItem('selectedTime');
      localStorage.removeItem('locationAddress');
      localStorage.removeItem('employeeName');
      localStorage.removeItem('serviceName');
      localStorage.removeItem('servicePrice');
      localStorage.removeItem('serviceDiscountPercentage');
    } else {
      // Update localStorage with the first remaining appointment
      const [firstAppointment] = updatedAppointments;
      localStorage.setItem('selectedDate', firstAppointment.selectedDate);
      localStorage.setItem('selectedTime', firstAppointment.selectedTime);
      localStorage.setItem('locationAddress', firstAppointment.locationAddress);
      localStorage.setItem('employeeName', firstAppointment.employeeName);
      localStorage.setItem('serviceName', firstAppointment.serviceName);
      localStorage.setItem('servicePrice', firstAppointment.servicePrice);
      localStorage.setItem('serviceDiscountPercentage', firstAppointment.serviceDiscountPercentage);
    }
  };

  return (
    <div className="appointment-summary-container-thirdstep">
      <h1 className="main-title-thirdstep">Make an Appointment</h1>

      {appointments.length === 0 ? (
        <p>No appointments found. Please make a booking first.</p>
      ) : (
        appointments.map((appointment, index) => (
          <div key={index} className="appointment-card-thirdstep">
            <h2 className="service-title-thirdstep">{appointment.serviceName}</h2>
            <p className="datetime-thirdstep">{new Date(appointment.selectedDate).toLocaleDateString()} at {appointment.selectedTime}</p>

            <div className="details-section-thirdstep">
              <div className="detail-group-thirdstep">
                <h3>Location</h3>
                <p>Location Address: {appointment.locationAddress}</p>
              </div>

              <div className="info-row-thirdstep">
                <div className="detail-group-thirdstep">
                  <h3>Employee</h3>
                  <p>Employee Name: {appointment.employeeName}</p>
                </div>

                <div className="detail-group-thirdstep">
                  <h3>Price</h3>
                  <p>${(
                    (parseInt(localStorage.getItem('bookingCount'), 10) >= 3
                      ? appointment.servicePrice - (appointment.servicePrice * (appointment.serviceDiscountPercentage || 0) / 100)
                      : appointment.servicePrice
                    )
                  ).toFixed(2)}</p>
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
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>

      <div className="action-buttons-thirdstep">
        <button className="add-more-button-thirdstep" onClick={onAddMore}>Add More</button>
        <button className="next-button-thirdstep" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default AppointmentSummary;