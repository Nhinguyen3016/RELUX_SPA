import React, { useState, useEffect } from 'react';
import '../../../styles/booking/component/FiveStep.css';
import PayOsIcon from '../../../image/payos.png';
import { FaExclamationTriangle } from 'react-icons/fa';

const PaymentForm = ({ onBack, onNext }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [servicePrice, setServicePrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const price = parseFloat(localStorage.getItem('servicePrice')) || 0;
    const discount = parseFloat(localStorage.getItem('discountAmount')) || 0;
    const total = price - discount;

    setServicePrice(price);
    setDiscountAmount(discount);
    setFinalTotalPrice(total);
  }, []);

  const handleReserveClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const authToken = localStorage.getItem('authToken');
    const selectedDateTime = localStorage.getItem('selectedDateTime');
    const fourStepBookingNotes = localStorage.getItem('fourStepBookingNotes');
    const selectedServiceId = JSON.parse(localStorage.getItem('selectedServiceId')) || [];
    const selectedLocationId = parseInt(localStorage.getItem('selectedLocationId'), 10);
    const selectedEmployeeId = parseInt(localStorage.getItem('selectedEmployeeId'), 10);
  
    if (!selectedDateTime || !selectedServiceId.length || isNaN(selectedLocationId) || isNaN(selectedEmployeeId)) {
      setErrorMessage('Missing necessary booking data or invalid ID format.');
      setIsSubmitting(false);
      return;
    }
  
    const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
    const url = `${API_HOST}/v1/bookings`;
  
    const bookingData = { 
      bookingTime: selectedDateTime, 
      bookingNotes: fourStepBookingNotes,
      serviceIds: selectedServiceId, 
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
      const responseData = await response.json();
      console.log('Booking Response:', responseData); 

      if (response.ok) {
        const bookingID = responseData.data;
        if (paymentMethod === 'onsite') {
          setErrorMessage('');
          onNext();
        } else if (paymentMethod === 'payos') {
            await createPaymentLink(bookingID);
        }
      } else {
        const errorData = await response.json();
        console.log('Booking error response:', errorData); 
    
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
    } finally {
      setIsSubmitting(false); 
    }
    
  };

  const convertUsdToVnd = async (usdAmount) => {
    const API_KEY = '5f19dda9a72f467239172933'; 
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
  
    try {
      // Gửi yêu cầu lấy tỷ giá USD/VND
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
  
      const data = await response.json();
      const usdToVndRate = data.conversion_rates.VND;
  
      // Chuyển đổi từ USD sang VND
      const vndAmount = usdAmount * usdToVndRate;
      return vndAmount;
    } catch (error) {
      console.error('Error converting USD to VND:', error);
      return null;
    }
  };

  const createPaymentLink = async (bookingID) => {
    const selectedServiceId = JSON.parse(localStorage.getItem('selectedServiceId')) || [];
    const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
    const url = `${API_HOST}/v1/payment/create`;
    const items = [];

    if (!bookingID) {
      setErrorMessage('Booking ID is missing.');
      return;
    }

      try {
        setLoading(true);
        const finalTotalPricePayOS = Math.round(await convertUsdToVnd(finalTotalPrice));

        if (finalTotalPricePayOS === null) {
          setErrorMessage('Currency conversion is not possible. Please try again.');
          setLoading(false);
          return;
        }
 
        const serviceResponse = await fetch(`${API_HOST}/dashboard/services/nameprice/${selectedServiceId}`);
        
        if (!serviceResponse.ok) {
          throw new Error(`Failed to fetch service with ID: ${selectedServiceId}`);
        }
  
        const service = await serviceResponse.json();
  
    
        if (service.Name && service.Price) {
          items.push({
            name: service.Name,
            quantity: 1,
            price: service.Price,
          });
        }


        const paymentData = {
          amount: finalTotalPricePayOS,
          description: 'Booking Appointment',
          bookingID,
          returnUrl: 'http://localhost:3001', 
          cancelUrl: 'http://localhost:3001', 
          items: items 
        };
        console.log(paymentData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const paymentResponse = await response.json();
        window.location.href = paymentResponse.paymentUrl; 
      } else {
        const errorData = await response.json();
        setErrorMessage(`Payment error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      setErrorMessage('Error creating payment. Please try again later.');
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cancelStatus = urlParams.get('cancel');  // Lấy tham số 'cancel'
    const status = urlParams.get('status');  // Lấy tham số 'status'
  
    // Nếu trạng thái thanh toán là 'CANCELLED' hoặc có tham số 'cancel=true'
    if (cancelStatus === 'true' || status === 'CANCELLED') {
      window.location.replace('http://localhost:3001/service');  // Chuyển hướng về trang dịch vụ mà không giữ tham số
    }
  
    // Nếu thanh toán thành công (PAID), có thể chuyển hướng khác nếu cần
    if (status === 'PAID') {
      window.location.replace('http://localhost:3001');  // Chuyển hướng về trang chính sau khi thanh toán thành công
    }
  }, []);
  
  
   

  return (
    <div className="payment-container">
      <h1 className="payment-title">Make an Appointment</h1>

      {errorMessage && (
        <div className="error-modal-overlay">
          <div className="error-modal">
            <button className="close-button" onClick={() => setErrorMessage('')}>&times;</button>
            <div className="error-content">
              <FaExclamationTriangle className="error-icon-p" />
              <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

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
            id="payos"
            name="payment"
            value="payos"
            checked={paymentMethod === 'payos'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="payos" className="payos-label">
            <img src={PayOsIcon} alt="PayOS" className="payos-logo" />
            <span>PayOS e-wallet</span>
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
