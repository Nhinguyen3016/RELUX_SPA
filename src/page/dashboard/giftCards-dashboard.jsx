import React, { useState, useEffect } from 'react';
import '../../styles/dashboard/listGiftCards.css';
import axios from 'axios';
import Select from 'react-select';


const API_BASE_URL = 'http://localhost:3003/dashboard';

const GiftCardsForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange, services }) => {
  console.log('Form Data in SchedulesForm:', formData);
  
  // Tạo danh sách các tùy chọn cho react-select
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
            <label>Employee</label>
            <Select
              name="name"
              value={servicesOptions.find(option => option.value === formData.name)}
              onChange={selectedOption => handleInputChange({
                target: { name: 'name', value: selectedOption ? selectedOption.value : '' }
              })}
              options={servicesOptions}
              isClearable
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
const [giftCards, setGiftCards] = useState([]);
const [services, setServices] = useState([]);
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

const fetchServices = async () =>{
  try {
    const response = await axios.get(`${API_BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setServices(response.data.service);
  } catch (error) {
    console.error('Error fetching services:', error);
    alert('Failed to fetch services');
  }
}

const fetchGiftCards = async () =>{
  try {
    const response = await axios.get(`${API_BASE_URL}/promotion`, {
      header:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('GiftCards fetched:', response.data.giftCards);

    setGiftCards(response.data.giftCards);
  }catch (error) {
    console.error('Error fetching giftCards:', error.response?.data || error);
    alert('Failed to fetch giftCards');
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 201) {
      await fetchGiftCards();
      handleCloseForm();
      alert('Gift card created successfully!');
    }
  } catch (error) {
    console.error('Error creating gift card:', error);
    alert(error.response?.data?.message || 'Failed to create gift card');
  }
};

const updateGiftCards = async () => {
  try {
    const dataToSend = {
      ...formData,
      discount: Number(formData.discount), 
    };

    const response = await axios.put(`${API_BASE_URL}/promotion/${formData.promotionID}`, dataToSend, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {
      await fetchGiftCards();
      handleCloseForm();
      alert('Gift card updated successfully!');
    }
  } catch (error) {
    console.error('Error updating gift card:', error);
    alert(error.response?.data?.message || 'Failed to update gift card');
  }
};

const deleteGiftCards = async (promotionID) => {
  try {
    console.log('Deleting promotion with ID:', promotionID);

    const response = await axios.delete(`${API_BASE_URL}/promotion/${promotionID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }, 
    });
    if (response.status === 200) {
      await fetchGiftCards();
      alert('GiftCards schedule deleted successfully!');
    }
  } catch (error) {
    console.error('Error deleting giftCards:', error);
    alert(error.response?.data?.message || 'Failed to delete giftCards');
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
  fetchServices();
  fetchGiftCards();
  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWV0Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzMzAwMjUyLCJleHAiOjE3MzM5MDUwNTJ9.7_1lF0-Zlyw9H2Wiw_rWrFD6OPkIu1egTTPuHhifm0k'
  );
}, []);

  return (
    <div className="gift-cards-container">
      <header className="gift-cards-header">
        <h2>List Gift Cards</h2>
        <div className="gift-cards-actions">
          <button className="filter-button">
            <i className="icon-filter"></i> Filter
          </button>
          <button className="add-button" onClick={handleAddClick}> + Add</button>
        </div>
      </header>
      <table className="gift-cards-table">
        <thead>
          <tr>
            <th>Services</th>
            <th>Discount</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {giftCards.length > 0 ?(
          giftCards.map((item, index) => (
            <tr key={index}>
              <td>{item.ServiceName || 'N/A'}</td>
              <td>{item.Discount || 'N/A'}</td>
              <td>{item.Description || 'N/A'}</td>
              <td className="red-text">{item.StartDate || 'N/A'}</td>
              <td className="red-text">{item.EndDate || 'N/A'}</td>
              <td className="actions">
                <button className="action-button edit-button" onClick={() => handleEditClick(item)}>✏️</button>
                <button className="action-button delete-button" onClick={() => deleteGiftCards(item.PromotionID, index)}>🗑️</button>
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
    </div>
  );
};

export default GiftCardsList;
