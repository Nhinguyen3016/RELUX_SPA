import React, { useState } from 'react';
import '../../../styles/booking/component/FiveStep.css';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('onsite');

  return (
    <div className="payment-container">
      <h1 className="payment-title">Make an Appointment</h1>

      <div className="payment-table">
        <table>
          <tbody>
            <tr>
              <td>Ayurvedic Spa Program</td>
              <td className="price-column">$49</td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td className="price-column">$49</td>
            </tr>
            <tr>
              <td>Total</td>
              <td className="price-column">$49</td>
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
        <button className="reserve-button">Reserve</button>
        <button className="back-button">Back</button>
      </div>
    </div>
  );
};

export default PaymentForm;