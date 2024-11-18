import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "../../../styles/account/OtpPage.css";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';

const OtpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data) => {
    const { otp } = data;
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("Email address not found.");
      return;
    }

    console.log('Verifying OTP for email:', email);

    try {
      const response = await fetch(`${API_HOST}/v1/password/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otpCode: otp,
          email: email,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'OTP verification failed');
      }

      console.log('OTP verification successful:', responseData);

      // Save reset token to localStorage and verify
      if (responseData.resetPasswordToken) {
        localStorage.setItem('resetToken', responseData.resetPasswordToken);
        // Check if the token has been saved
        const token = localStorage.getItem('resetToken');
        if (token) {
          console.log('Reset token has been saved to localStorage:', token);
        } else {
          console.warn('Unable to save reset token to localStorage');
        }
      } else {
        console.warn('No reset token received from the server');
      }

      // Redirect to the new password page
      navigate('/new-password');
    } catch (error) {
      console.error('Error while verifying OTP:', error);
      setError('otp', { 
        message: error.message || 'OTP verification failed. Please try again.' 
      });
    }
  };

  const handleResendOTP = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("Email address not found.");
      return;
    }

    try {
      const response = await fetch(`${API_HOST}/v1/password/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to resend OTP');
      }

      alert('A new OTP has been sent to your email');
    } catch (error) {
      console.error('Error while resending OTP:', error);
      alert('Unable to resend OTP. Please try again.');
    }
  };

  return (
    <div className="container-otp">
      <button className="back-button-otp" onClick={() => navigate(-1)}>
        ←
      </button>

      <h1 className="title-otp">OTP Verification</h1>
      <p className="description-otp">
        Enter the verification code we just sent to your email address.
      </p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group-otp">
          <input
            type="text"
            maxLength={6}
            {...register('otp', {
              required: 'Please enter the OTP',
              pattern: {
                value: /^\d{6}$/,
                message: 'OTP must be 6 digits long'
              }
            })}
            className={`input-box-otp ${errors.otp ? 'error' : ''}`}
            placeholder="Enter OTP"
          />
        </div>

        {errors.otp && (
          <div className="form-error-message">{errors.otp.message}</div>
        )}

        <button 
          type="submit" 
          className="verify-button-otp" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <div className="resend-container-otp">
        <span className="resend-text-otp">Didn’t receive the code? </span>
        <button 
          className="resend-button-otp"
          onClick={handleResendOTP}
          type="button"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
