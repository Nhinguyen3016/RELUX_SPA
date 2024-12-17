import React, { useEffect, useState } from 'react';
import '../../../styles/booking/component/FinalStep.css';
import rel from '../../../images/relax1.jpg';

const AppointmentModal = ({ setCurrentStep }) => {
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  // Dừng loading sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 giây

    // Xóa bộ hẹn giờ nếu component bị hủy
    return () => clearTimeout(timer);
  }, []);

  const handleNewReservation = () => {
    setCurrentStep(0); // Quay về bước đầu tiên
  };

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}
      <div className="appointment-modal-overlay">
        <div className="appointment-modal-content">
          <h2 className="appointment-modal-title">Make an Appointment</h2>
          <p className="appointment-modal-message">You've successfully made a booking. Thank you!</p>
          <div className="appointment-modal-image-container">
            <img
              src={rel}
              alt="Botanical elements"
              className="appointment-modal-image"
            />
          </div>
          <button 
            className="appointment-modal-button" 
            onClick={handleNewReservation}
          >
            Add New Reservation
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentModal;
