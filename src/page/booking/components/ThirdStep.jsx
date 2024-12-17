import React, { useState, useEffect, useCallback } from 'react';
import '../../../styles/booking/component/ThirdStep.css';

const AppointmentSummary = ({ onBack, onNext }) => {
  // State to manage appointments, discount, and total price after discount
  const [appointments, setAppointments] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

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

  // Memoize the function to calculate total price, discount, and total after discount
  const calculateTotal = useCallback(() => {
    const bookingCount = parseInt(localStorage.getItem('bookingCount'), 10) || 0;

    // Calculate the total price and discount for each appointment
    let totalPrice = 0;
    let calculatedDiscountAmount = 0;

    appointments.forEach((app) => {
      const discount = app.serviceDiscountPercentage || 0;
      
      // If bookingCount >= 3, calculate discount; otherwise, set discountAmount to 0
      if (bookingCount >= 3) {
        calculatedDiscountAmount = app.servicePrice * (discount / 100);
      } else {
        calculatedDiscountAmount = 0; // No discount if bookingCount < 3
      }
      
      setDiscountAmount(calculatedDiscountAmount);
      localStorage.setItem('discountAmount', calculatedDiscountAmount.toFixed(2));

      // If bookingCount >= 3, apply the discount, otherwise use the original price
      const priceToCharge = app.servicePrice - calculatedDiscountAmount;
      totalPrice += priceToCharge;
    });

    // Set the total after discount
    setTotalAfterDiscount(totalPrice);

    // Return the total price
    return totalPrice;
  }, [appointments]);

  // Recalculate total whenever the discountAmount or appointments change
  useEffect(() => {
    // Load data from localStorage again, to make sure updates reflect
    const updatedServicePrice = parseFloat(localStorage.getItem('servicePrice')) || 0;
    const updatedDiscountPercentage = parseFloat(localStorage.getItem('serviceDiscountPercentage')) || 0;

    // Recalculate the total price and discount
    setAppointments((prevAppointments) => prevAppointments.map((app) => ({
      ...app,
      servicePrice: updatedServicePrice,
      serviceDiscountPercentage: updatedDiscountPercentage,
    })));

    calculateTotal(); // Ensure the total is recalculated
  }, [discountAmount, calculateTotal]); // Use discountAmount as a trigger for recalculation

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
            </div>
          </div>
        ))
      )}

      <div className="divider-thirdstep"></div>

      <div className="total-section-thirdstep">
        <h3>Total (After Discount): ${totalAfterDiscount.toFixed(2)}</h3>
      </div>

      <div className="action-buttons-thirdstep">
        <button className="add-more-button-thirdstep" onClick={onBack}>Back</button>
        <button className="next-button-thirdstep" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
