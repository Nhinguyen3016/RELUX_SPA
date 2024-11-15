import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard/Service-category-dashboard.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/v1';

const ServiceForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange }) => {
  return (
    <div className="service-form-overlay">
      <div className="service-form-category">
        <h2 className="service-form-title">{isEditing ? 'Edit Service' : null}</h2>
        <button className="close-button" onClick={onClose}>×</button>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
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

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="description-category"
              name="descriptionShort"
              placeholder="Enter description"
              value={formData.descriptionShort}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>TypeService</label>
            <input
              type="text"
              name="typeService"
              placeholder="Enter typeService"
              value={formData.typeService}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-action">
            <button type="submit">{isEditing ? 'Update' : 'Add'} Service</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ServiceMenu = () => {
  const [services, setServices] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    descriptionShort: '',
    typeService: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value  
    }));
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/service-categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data.data);
      setServices(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching services:', error.response ? error.response.data : error);
      alert(error.response?.data?.message || 'Failed to fetch services');
    }
  };

  const createService = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/service-categories`, {
        name: formData.name,
        descriptionShort: formData.descriptionShort,
        typeService: formData.typeService,
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 201) {
        await fetchServices();
        handleCloseForm();
        alert('Service created successfully!');
      }
    } catch (error) {
      console.error('Error creating service:', error);
      alert(error.response?.data?.message || 'Failed to create service');
    }
  };

  const updateService = async () => {
    try {
      console.log('Updating service with data:', formData);
      const response = await axios.put(`${API_BASE_URL}/service-categories/${formData.id}`, {
        name: formData.name,
        descriptionShort: formData.descriptionShort,
        typeService: formData.typeService,
      },{
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
      console.error('Response data:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to update service');
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }
    try {
      const response = await axios.delete(`${API_BASE_URL}/service-categories/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        await fetchServices();
        alert('Service deleted successfully!');
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
    }
  };

  const handleEditClick = (service) => {
    setFormData({
      id: service.id,
      name: service.name,
      descriptionShort: service.descriptionShort,
      typeService: service.typeService,
    });
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setFormData({
      categoryID: null,
      name: '',
      descriptionShort: '',
      typeService: '',
    });
    setShowEditForm(false);
  };

  // const handleAddClick = () => {
  //   setFormData({
  //     categoryID: null,
  //     name: '',
  //     descriptionShort: '',
  //     typeService: '',
  //   });
  //   setShowAddForm(true);
  // };

  useEffect(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJxdW9jdmlldCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMTM0MTUzMiwiZXhwIjoxNzMxOTQ2MzMyfQ.aceQSJj6KOxbQBXPenVx8giF2Ykoc3nQdmdyeGG69-A'
    );
    fetchServices();
  }, []);

  return (
    <div className="service-menu-category">
      <div className="service-cards-category">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <Link
                to={`/servicecategory/service`}
                key={service.categoryID}
                className="service-card-category"
                onClick={() => { localStorage.setItem('selectedServiceId', service.id);}}
            >
              <h3 className="service-title-category">{service.name}</h3>
              <p className="service-description">
                <span className="detail-label">Description Short:</span> {service.descriptionShort || 'No description short available'}
              </p>
              <p className="service-typeService">
                <span className="detail-label">TypeService:</span> {service.typeService || 'No typeService available'}
              </p>
              <div className="service-action-category">
                <button onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEditClick(service);
                }}>Edit</button>
                
              </div>
            </Link>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>


      {(showEditForm) && (
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

export default ServiceMenu;
