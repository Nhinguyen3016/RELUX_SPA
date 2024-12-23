import React, { useState, useEffect } from 'react';
import '../../../styles/booking/component/FiveStep.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const PaymentForm = ({ onBack, onNext }) => {
  const [paymentMethod, setPaymentMethod] = useState('onsite');
  const [servicePrice, setServicePrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const price = parseFloat(localStorage.getItem('servicePrice')) || 0;
    const discount = parseFloat(localStorage.getItem('discountAmount')) || 0;
    const total = price - discount;

    setServicePrice(price);
    setDiscountAmount(discount);
    setFinalTotalPrice(total);
  }, []);

  const handleReserveClick = async () => {
    const authToken = localStorage.getItem('authToken');
    const selectedDateTime = localStorage.getItem('selectedDateTime');
    const fourStepBookingNotes = localStorage.getItem('fourStepBookingNotes');
    const selectedServiceId = JSON.parse(localStorage.getItem('selectedServiceId')) || []; // Lấy từ localStorage
    const selectedLocationId = parseInt(localStorage.getItem('selectedLocationId'), 10);
    const selectedEmployeeId = parseInt(localStorage.getItem('selectedEmployeeId'), 10);

    if (!selectedDateTime || !selectedServiceId.length || isNaN(selectedLocationId) || isNaN(selectedEmployeeId)) {
      setErrorMessage('Missing necessary booking data or invalid ID format.');
      return;
    }

    const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
    const url = `${API_HOST}/v1/bookings`;

    const bookingData = { 
      bookingTime: selectedDateTime, 
      bookingNotes: fourStepBookingNotes,
      serviceIds: selectedServiceId,  // Sử dụng selectedServiceId từ localStorage
      locationId: selectedLocationId, 
      employeeId: selectedEmployeeId, 
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, 
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Booking successful:', responseData);
        setErrorMessage('');
        onNext();
      } else {
        const errorData = await response.json();
        if (errorData.message === 'The selected employee is not available during this time slot') {
          setErrorMessage('The selected employee is not available during this time slot');
        } else if (errorData.message === 'You already have a booking during this time slot') {
          setErrorMessage('You already have a booking during this time slot');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Make an Appointment</h1>

      {errorMessage && (
        <div className="error-modal-overlay">
          <div className="error-modal">
            <button className="close-button" onClick={() => setErrorMessage('')}>&times;</button>
            {/* Biểu tượng cảnh báo và thông báo lỗi */}
            <div className="error-content">
              <FaExclamationTriangle className="error-icon-p" />
              <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Các phần khác của form */}
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

      {/* Các phương thức thanh toán */}
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
            <img src="/vnpay-logo.png" alt="VNPAY" className="vnpay-logo" />
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
