import React, { useState, useEffect } from 'react';
import '../../../styles/booking/component/FiveStep.css';

const PaymentForm = ({ onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('onsite');
  const [servicePrice, setServicePrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const price = parseFloat(localStorage.getItem('servicePrice')) || 0;
    const discount = parseFloat(localStorage.getItem('discountAmount')) || 0;
    const total = parseFloat(localStorage.getItem('finalTotalPrice')) || 0;

    setServicePrice(price);
    setDiscountAmount(discount);
    setFinalTotalPrice(total);
  }, []);

  const handleReserveClick = async () => {
    const authToken = localStorage.getItem('authToken'); // Get the auth token from localStorage
    const selectedDate = localStorage.getItem('selectedDate'); // Get the selected date
    const fourStepBookingNotes = localStorage.getItem('fourStepBookingNotes'); // Get the notes
    const serviceIds = JSON.parse(localStorage.getItem('serviceIds')) || []; // Get the service IDs
    const selectedLocationId = parseInt(localStorage.getItem('selectedLocationId'), 10); // Convert location ID to number
    const selectedEmployeeId = parseInt(localStorage.getItem('selectedEmployeeId'), 10); // Convert employee ID to number

    // Check if required data is available
    if (!selectedDate || !serviceIds.length || isNaN(selectedLocationId) || isNaN(selectedEmployeeId)) {
      console.error('Missing necessary booking data or invalid ID format.');
      return;
    }

    const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
    const url = `${API_HOST}/v1/bookings`;

    const bookingData = {
      bookingTime: selectedDate,
      bookingNotes: fourStepBookingNotes,
      serviceIds: serviceIds,
      locationId: selectedLocationId, // Pass as number
      employeeId: selectedEmployeeId, // Pass as number
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the token in the request header
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Booking successful:', responseData);
        // Handle success (you can redirect or show a confirmation message here)
      } else {
        console.error('Booking failed:', response.statusText);
        // Handle error (show an error message to the user)
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle error (show an error message to the user)
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Make an Appointment</h1>

      <div className="payment-table">
        <table>
          <tbody>
            <tr>
              <td>Listed price</td>
              <td className="price-column">${servicePrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Discount offers</td>
              <td className="price-column">-${discountAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td className="price-column">${finalTotalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="payment-methods">
        <div className="payment-option">
          <input
            type="radio"
            id="onsite"
            name="payment"
            value="onsite"
            checked={paymentMethod === 'onsite'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="onsite">Pay on-site</label>
        </div>

        <div className="payment-option">
          <input
            type="radio"
            id="vnpay"
            name="payment"
            value="vnpay"
            checked={paymentMethod === 'vnpay'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="vnpay" className="vnpay-label">
            <img
              src="/vnpay-logo.png"
              alt="VNPAY"
              className="vnpay-logo"
            />
            <span>VNPAY e-wallet</span>
          </label>
        </div>
      </div>

      <div className="button-group">
        <button className="back-button" onClick={onBack}>Back</button>
        <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
      </div>
    </div>
  );
};

export default PaymentForm;
