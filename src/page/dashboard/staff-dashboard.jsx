import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useSnackbar } from 'notistack';
import '../../styles/dashboard/listGiftCards.css';
import DeletePopupConfirm from './deletePopupConfirm';


const API_BASE_URL = 'http://localhost:3003/dashboard';

const GiftCardsForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange, services }) => {
  console.log('Form Data in SchedulesForm:', formData);
  
  const servicesOptions = services.map(service => ({
    value: service.Name,
    label: service.Name
  }));

  return (
    <div className="gift-card-form-overlay">
      <div className="gift-card-form-category">
        <h2 className="gift-card-form-title">
          {isEditing ? 'Edit gift card' : 'Add New gift card'}
        </h2>
        <button className="close-button-gift-card" onClick={onClose}>×</button>
        <form onSubmit={onSubmit} className="schedules-add-from">
          <div className="form-group">
            <label>Services</label>
            <Select
              name="name"
              value={servicesOptions.find(option => option.value === formData.name)}
              onChange={selectedOption => handleInputChange({
                target: { name: 'name', value: selectedOption ? selectedOption.value : '' }
              })}
              options={servicesOptions}
              placeholder="Select or type to search"
            />
          </div>
          
          <div className="form-groups">
            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              placeholder="Enter discount"
              value={formData.discount}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groups">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              {isEditing ? 'Update gift card' : 'Add gift card'}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GiftCardsList = () => {
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); 
  const [selectedPromotionID, setSelectedPromotionID] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    promotionID: null,
    name: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: ''
  });

  const {enqueueSnackbar}= useSnackbar();

  const fetchEmployees = async () =>{
    try {
      const response = await axios.get(`${API_BASE_URL}/staff`, {
        header:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setEmployees(response.data.employees);
    }catch (error) {
      console.error('Error fetching employees:', error.response?.data || error);
      alert('Failed to fetch employees');
    }
  };

  const createGiftCards = async () => {
    try {
      const dataToSend = {
        ...formData,
        discount: Number(formData.discount), 
      };

      const response = await axios.post(`${API_BASE_URL}/promotion`, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 201) {
        await fetchGiftCards();
        handleCloseForm();
        enqueueSnackbar("Gift card created successfully!", {variant: 'success'})
      }
    } catch (error) {
      console.error('Error creating gift card:', error);
      enqueueSnackbar("Failed to create gift card", {variant: 'error'})
    }
  };

  const updateGiftCards = async () => {
    try {
      // Kiểm tra tất cả các trường bắt buộc
      const { promotionID, name, description, discount, startDate, endDate } = formData; // Lấy dữ liệu từ form
      if (!promotionID || !name || !description || discount === '' || !startDate || !endDate) {
        throw new Error("All fields (promotionID, name, description, discount, startDate, endDate) are required.");
      }

      // Kiểm tra giá trị discount hợp lệ (chuyển thành số)
      const discountValue = parseInt(discount, 10);
      if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) { // Ensure discount is between 0 and 100
          throw new Error('Discount value must be a number between 0 and 100.');
      }

    
      const dataToSend = {
        promotionID, 
        name, 
        description, 
        discount: discountValue, 
        startDate, 
        endDate, 
      };

      console.log('Data to send for update:', dataToSend); // Log dữ liệu đang gửi

      // Gửi yêu cầu cập nhật thông tin gift card
      const response = await axios.put(`${API_BASE_URL}/promotion/${promotionID}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });


      if (response.status === 200 && response.data.success) {
        await fetchGiftCards(); 
        handleCloseForm(); 
        enqueueSnackbar("Gift card updated successfully!", {variant: 'success'})
      } else {
        throw new Error(response.data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error updating gift card:', error.response?.data || error.message || error);
      enqueueSnackbar("Failed to update gift card", {variant: 'error'})
    }
  };


  const deleteGiftCards = async (promotionID) => {
    try {
      console.log('Deleting promotion with ID:', promotionID);

      const response = await axios.delete(`${API_BASE_URL}/promotion/${promotionID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }, 
      });
      if (response.status === 200) {
        await fetchGiftCards();
        enqueueSnackbar("Gift card deleted successfully!", {variant: 'success'});
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.error('Error deleting giftCards:', error);
      alert(error.response?.data?.message || 'Failed to delete giftCards');
      enqueueSnackbar("Failed to delete gift cards", {variant: 'error'})
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data being submitted:', formData);

    if (!formData.name || !formData.description|| !formData.discount || !formData.startDate || !formData.endDate) {
      alert('Please fill all required fields');
      return;
    }

    try {
      if (showEditForm) {
        await updateGiftCards();
      } else {
        await createGiftCards();
      }
    } catch (error) {
      console.error('Error handling gift card:', error);
      alert(error.message || 'An error occurred');
    }
  };

  const handleEditClick = (card) => {
    setFormData({
      promotionID: card.PromotionID,
      name: card.ServiceName,
      description: card.Description,
      discount: card.Discount * 100,
      startDate: card.StartDate,
      endDate: card.EndDate
    });
    setShowAddForm(false);
    setShowEditForm(true);
  };

  const handleAddClick = () => {
    setFormData({
      promotionID: null,
      name: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: ''
    });
    setShowAddForm(true);  
    setShowEditForm(false); 
  };
  const handleDeleteClick = (promotionID) => {
    setSelectedPromotionID(promotionID); 
    setIsDeletePopupOpen(true); 
  };

  const handleConfirmDelete = () => {
    if (selectedPromotionID) {
      deleteGiftCards(selectedPromotionID);
    }
  };
  const handleClosePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedPromotionID(null);
  };

  const handleCloseForm = () => {
    setFormData({
      promotionID: null,
      name: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: ''
    });
    setShowEditForm(false);
    setShowAddForm(false);
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="gift-cards-container">
      <header className="gift-cards-header">
        <h2>List Staff</h2>
        <div className="gift-cards-actions">
          <button className="add-button" onClick={handleAddClick}> + Add</button>
        </div>
      </header>
      <table className="gift-cards-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ?(
          employees.map((item, index) => (
            <tr key={index}>
              <td>{item.Name || 'N/A'}</td>
              <td>{item.Phone || 'N/A'}</td>
              <td>{item.Email || 'N/A'}</td>
              <td>{item.Description || 'N/A'}</td>
              <td className="actions">
                <button className="action-button-dashboard edit-button-dashboard" onClick={() => handleEditClick(item)}>✏️</button>
                <button className="action-button-dashboard delete-button-dashboard" onClick={() => handleDeleteClick(item.PromotionID, index)}>🗑️</button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td>No schedules data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {(showAddForm || showEditForm) && (
        <GiftCardsForm
          isEditing={showEditForm}
          formData={formData}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          handleInputChange={handleInputChange}
          services={services}
        />
      )}
      <DeletePopupConfirm
        isOpen={isDeletePopupOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleClosePopup}
      />
    </div>
  );
};

export default GiftCardsList;
