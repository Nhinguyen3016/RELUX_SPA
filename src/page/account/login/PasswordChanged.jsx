import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../../../styles/account/PasswordChanged.css';

const PasswordChanged = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleBackToLogin = () => {
    navigate('/account');  // Navigate to the login page when the button is clicked
  };

  return (
    <div className="password-changed-container">
      <div className="success-content">
        <div className="success-icon">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 className="success-title">Password Changed!</h1>
        <p className="success-message">Your password has been changed successfully.</p>
        <button className="back-button" onClick={handleBackToLogin}>Back to Login</button>  {/* Attach handleBackToLogin function */}
      </div>
    </div>
  );
};

export default PasswordChanged;
