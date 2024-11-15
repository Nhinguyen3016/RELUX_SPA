import React, { useState, useEffect } from 'react';
import '../../styles/dashboard/Service-dashboard.css';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001/v1';

const ServiceForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange }) => {
  return (
    <div className="service-form-overlays">
      <div className="service-forms">
        <h2 className="service-form-titles">{isEditing ? 'Edit Service' : 'Add Service'}</h2>
        <button className="close-button" onClick={onClose}>×</button>
        
        <form onSubmit={onSubmit}>
          <div className="form-groups">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter service name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-groups">
            <label>Description Short</label>
            <textarea
              name="descriptionShort"
              placeholder="Enter short description"
              value={formData.descriptionShort}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-groups">
            <label>Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              placeholder="Enter duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-groups">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-groups">
            <label>Image Icon</label>
            <input
              type="text"
              name="imageIcon"
              placeholder="Enter icon image URL"
              value={formData.imageIcon}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groups">
            <label>Promotion ID</label>
            <input
              type="number"
              name="promotionId"
              placeholder="Enter promotion ID"
              value={formData.promotionId}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groups">
            <label>Description 1</label>
            <input
              type="text"
              name="description1"
              placeholder="Enter description 1"
              value={formData.description1}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groups">
            <label>Description 2</label>
            <input
              type="text"
              name="description2"
              placeholder="Enter description 2"
              value={formData.description2}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groups">
            <label>Image Main</label>
            <input
              type="text"
              name="imageMain"
              placeholder="Enter image main URL"
              value={formData.imageMain}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-groups">
            <label>Image Description</label>
            <input
              type="text"
              name="imageDescription"
              placeholder="Enter image description"
              value={formData.imageDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit">{isEditing ? 'Update' : 'Add'} Service</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ServicePackage = () => {
  const [services, setServices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: null,
    name: '',
    price: 0,
    descriptionShort: '',
    duration: 0,
    imageIcon: '',
    imageDescription: '',
    categoryId: 0,
    promotionId: 0,
    description1: '',
    description2: '',
    imageMain: ''
  });

  useEffect(() => {
    const selectedServiceId = localStorage.getItem('selectedServiceId');
    console.log("Selected Service ID from localStorage:", selectedServiceId);
  
    if (selectedServiceId) {
      const id = Number(selectedServiceId); // Chuyển đổi thành số
      console.log("Converted ID:", id); // Log giá trị đã chuyển đổi
      if (!isNaN(id) && id > 0) { // Kiểm tra xem id có hợp lệ không
        console.log("Valid Service ID:", id);
        fetchServices(id); // Fetch services based on selectedServiceId
      } else {
        console.error('Invalid service ID:', selectedServiceId); // In ra lỗi nếu serviceId không hợp lệ
      }
    } else {
      console.log('No service ID found in localStorage');
    }
  }, []);

  const fetchServices = async (id) => {
    if (isNaN(id) || id <= 0) {
      console.error('Invalid ID provided to fetchServices:', id);
      return; // Dừng hàm nếu ID không hợp lệ
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}/services/category/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Kiểm tra xem phản hồi có chứa dữ liệu không
      console.log("Fetched services:", response.data); // Log phản hồi từ API
  
      // Giả sử phản hồi có cấu trúc { data: [...] }
      if (response.data && Array.isArray(response.data.data)) {
        setServices(response.data.data); // Cập nhật state với mảng dịch vụ
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error.response ? error.response.data : error);
      alert(error.response?.data?.message || 'Failed to fetch services');
    }
  };

  
  const createService = async () => {
    try {
      const categoryId =Number(localStorage.getItem('selectedServiceId')) ; 

      const response = await axios.post(`${API_BASE_URL}/services`, {
        name: formData.name,
        price: Number(formData.price),
        descriptionShort: formData.descriptionShort,
        duration: Number(formData.duration),
        imageIcon: formData.imageIcon,
        imageDescription: formData.imageDescription,
        categoryId: categoryId,
        promotionId: Number(formData.promotionId),
        description1: formData.description1,
        description2: formData.description2,
        imageMain: formData.imageMain
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 201) {
        const selectedServiceId = localStorage.getItem('selectedServiceId');
        if (selectedServiceId) {
          const id = Number(selectedServiceId);
          if (!isNaN(id) && id > 0) {
            await fetchServices(id); // Gọi lại hàm fetchServices với ID hợp lệ
          } else {
            console.error('Invalid service ID after deletion:', selectedServiceId);
          }
        } else {
          console.log('No service ID found in localStorage after deletion');
        }
        handleCloseForm();
        alert('Service created successfully!');
      }
    } catch (error) {
      console.error('Error creating service:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
        alert(error.response.data.message || 'Failed to create service');
      } else {
        alert('Failed to create service');
      }
    }
  };

  const updateService = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/services/${formData.serviceId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        await fetchServices();
        handleCloseForm();
        alert('Service updated successfully!');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert(error.response?.data?.message || 'Failed to update service');
    }
  };

  //   if (!window.confirm('Are you sure you want to delete this service?')) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.delete(`${API_BASE_URL}/services/${id}`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     });
  //     if (response.status === 200) {
  //       await fetchServices();
  //       alert('Service deleted successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting service:', error);
  //     alert(error.response?.data?.message || 'Failed to delete service');
  //   }
  // };
  // const deleteService = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this service?')) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.delete(`${API_BASE_URL}/services/${id}`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     });
  //     if (response.status === 200) {
  //       await fetchServices(); // Gọi lại hàm fetchServices để cập nhật danh sách
  //       alert('Service deleted successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting service:', error);
  //     alert(error.response?.data?.message || 'Failed to delete service');
  //   }
  // };
  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }
    try {
      const response = await axios.delete(`${API_BASE_URL}/services/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.status === 200) {
        const selectedServiceId = localStorage.getItem('selectedServiceId');
        if (selectedServiceId) {
          const id = Number(selectedServiceId);
          if (!isNaN(id) && id > 0) {
            await fetchServices(id); // Gọi lại hàm fetchServices với ID hợp lệ
          } else {
            console.error('Invalid service ID after deletion:', selectedServiceId);
          }
        } else {
          console.log('No service ID found in localStorage after deletion');
        }
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert(error.response?.data?.message || 'Failed to delete service');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await updateService();
    } else {
      await createService();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = (service) => {
    setFormData({
      serviceId: null,
    name: '',
    price: '',
    descriptionShort: '',
    duration: '',
    imageIcon: null,
    imageDescription: null,
    categoryId: null,
    promotionId: null,
    description1: null,
    description2: null,
    imageMain: null
    });
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setFormData({
      serviceId: null,
    name: '',
    price: '',
    descriptionShort: '',
    duration: '',
    imageIcon: null,
    imageDescription: null,
    categoryId: null,
    promotionId: null,
    description1: null,
    description2: null,
    imageMain: null
    });
    setShowAddForm(true);
    setShowEditForm(false);
  };

  const handleCloseForm = () => {
    setFormData({
      serviceId: null,
      name: '',
      price: '',
      descriptionShort: '',
      duration: '',
      imageIcon: '',
      categoryId: null,
      promotionId: null
    });
    setShowAddForm(false);
    setShowEditForm(false);
  };
  useEffect(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJxdW9jdmlldCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMTM0MTUzMiwiZXhwIjoxNzMxOTQ2MzMyfQ.aceQSJj6KOxbQBXPenVx8giF2Ykoc3nQdmdyeGG69-A'
    );
  }, []);
  return (
    <div className="service-menu">
      <div className="service-menu-header">
        <button className="add-button" onClick={handleAddClick}>Add</button>
      </div>
      <div className="service-small">
         {Array.isArray(services) && services.length > 0 ? (
           services.map((service) => (
          <div
           key={service.serviceId} 
           className="service-card1"
           >
              <h3 className="service-title-category">{service.name}</h3>
              <div className="service-details">
              <p><span className="detail-label1">Duration:</span> {service.duration} mins</p>
              <p><span className="detail-label1">Price:</span> ${service.price}</p>
              <p className="service-description"><span className="detail-label1">Description Short:</span> {service.descriptionShort}</p>
            </div>
              <div className="service-actions">
              <button onClick={(e) => {
                e.preventDefault();
                handleEditClick(service);
              }}>Edit</button>
              <button onClick={(e) => {
                e.preventDefault();
                deleteService(service.id);
              }}>Delete</button>
              </div>
          </div>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
  
      {(showAddForm || showEditForm) && (
        <ServiceForm
          isEditing={showEditForm}
          formData={formData}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
  
};

export default ServicePackage;
