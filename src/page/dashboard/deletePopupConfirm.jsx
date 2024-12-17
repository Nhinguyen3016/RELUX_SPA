import React from 'react';
import '../../styles/dashboard/deletePopupConfirm.css';

const DeleteConfirmationPopup = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="delete-popup-overlay">
        <div className="delete-popup">
          <h3>Are you sure you want to delete?</h3>
          <div className="popup-actions">
            <button onClick={onConfirm} className="confirm-button">Yes, delete it!</button>
            <button onClick={onCancel} className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
export default DeleteConfirmationPopup;  