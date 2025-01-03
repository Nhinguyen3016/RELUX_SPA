import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useSnackbar } from 'notistack';
import { z } from 'zod';
import '../../styles/dashboard/listGiftCards.css';
import DeletePopupConfirm from './deletePopupConfirm';


const API_BASE_URL = 'http://localhost:3000/dashboard';

// Lấy ngày hiện tại (format yyyy-mm-dd)
const today = new Date().toISOString().split('T')[0];

const giftCardSchema = z
  .object({
    promotionID: z.number().nullable(),
    name: z.string().min(1, "Service name is required"),
    description: z.string().min(1, "Description is required"),
    discount: z
      .number({ invalid_type_error: "Discount must be a number" })
      .min(0, "Discount cannot be less than 0")
      .max(100, "Discount cannot exceed 100"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => new Date(data.startDate) >= new Date(today),
    {
      message: "Start date cannot be earlier than today.",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => new Date(data.endDate) >= new Date(today),
    {
      message: "End date cannot be earlier than today.",
      path: ["endDate"], 
    }
  )
  .refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    {
      message: "End date cannot be earlier than start date.",
      path: ["endDate"], 
    }
  );


const GiftCardsForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange, services }) => {
  console.log('Form Data in SchedulesForm:', formData);
  
  const servicesOptions = services.map(service => ({
    value: service.Name,
    label: service.Name
  }));

  return (
    <div className="gift-card-form-overlay-dashboard">
      <div className="gift-card-form-category-dashboard">
        <h2 className="gift-card-form-title-dashboard">
          {isEditing ? 'Edit gift card' : 'Add New gift card'}
        </h2>
        <button className="close-button-gift-card-dashboard" onClick={onClose}>×</button>
        <form onSubmit={onSubmit} className="gift-card-add-from">
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
  const [giftCards, setGiftCards] = useState([]);
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

  const fetchServices = async () =>{
    try {
      const response = await axios.get(`${API_BASE_URL}/promotion/services`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setServices(response.data.service);
    } catch (error) {
      console.error('Error fetching services:', error);
      // alert('Failed to fetch services');
    }
  };

  const fetchGiftCards = async () =>{
    try {
      const response = await axios.get(`${API_BASE_URL}/promotion`, {
        header:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log('GiftCards fetched:', response.data.giftCards);

      setGiftCards(response.data.giftCards);
    }catch (error) {
      console.error('Error fetching giftCards:', error.response?.data || error);
      // alert('Failed to fetch giftCards');
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

      if (isNaN(discount) || discount < 0 || discount > 100) { // Ensure discount is between 0 and 100
          throw new Error('Discount value must be a number between 0 and 100.');
      }

    
      const dataToSend = {
        promotionID, 
        name, 
        description, 
        discount, 
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
      // alert(error.response?.data?.message || 'Failed to delete giftCards');
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
  
    try {
      const validatedData = giftCardSchema.parse({
        ...formData,
        discount: Number(formData.discount), 
      });
  
      if (showEditForm) {
        await updateGiftCards(validatedData);
      } else {
        await createGiftCards(validatedData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          enqueueSnackbar(`${err.path[0]}: ${err.message}`, { variant: 'error' });
        });
      } else {
        console.error('Unexpected error:', error);
        enqueueSnackbar(error.message || 'An unexpected error occurred', { variant: 'error' });
      }
    }
  };


  const handleEditClick = (card) => {
    setFormData({
      promotionID: card.PromotionID,
      name: card.ServiceName,
      description: card.Description,
      discount: card.Discount ,
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
    fetchServices();
    fetchGiftCards();
  }, []);

  return (
    <div className="gift-cards-container">
      <header className="gift-cards-header">
        <h2>List Gift Cards</h2>
        <div className="gift-cards-actions">
          <button className="add-button" onClick={handleAddClick}> + Add</button>
        </div>
      </header>
      <table className="gift-cards-table">
        <thead>
          <tr>
            <th>Services</th>
            <th>Discount</th>
            <th>Description</th>
            <th className='start'>Start Date</th>
            <th className='end'>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {giftCards.length > 0 ?(
          giftCards.map((item, index) => (
            <tr key={index}>
              <td>{item.ServiceName || 'N/A'}</td>
              <td className="discount">{item.Discount ? item.Discount : 0 || 'N/A'}%</td>
              <td>{item.Description || 'N/A'}</td>
              <td className="text">{item.StartDate || 'N/A'}</td>
              <td className="text">{item.EndDate || 'N/A'}</td>
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
