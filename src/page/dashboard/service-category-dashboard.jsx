import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard/Service-category-dashboard.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const ServiceForm = ({ isEditing, formData, onSubmit, onClose, handleFileChange, handleInputChange }) => {
  return (
    <div className="service-form-overlay">
      <div className="service-form">
        <h2 className="service-form-title">{isEditing ? 'Edit Service' : 'Add Service'}</h2>
        <button className="close-button" onClick={onClose}>×</button>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="serviceName"
              placeholder="Enter service name"
              value={formData.serviceName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className='description-category'
              name="description"
              placeholder="Enter description"
              value={formData.description}
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

          <div className="form-actions">
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    duration: '',
    price: '',
    promotion: '',
    typeService: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      icon: e.target.files[0]
    }));
  };

  // Fetch all services
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setServices(response.data);
      console.log('Fetched services:', response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      alert(error.response?.data?.message || 'Failed to fetch services');
    }
  };
  // ... existing imports ...
// const fetchServices = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/service`);
//     setServices(response.data);
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     alert('Failed to fetch services');
//   }
// };
  // Create new service
  const createService = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('serviceName', formData.serviceName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('typeService',formData.typeService);

      const response = await axios.post(`${API_BASE_URL}/services`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

  // Update existing service
  const updateService = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('serviceName', formData.serviceName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('typeService',formData.typeService);

      const response = await axios.put(`${API_BASE_URL}/services/${formData.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

  // Delete service
  const deleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/services/${serviceId}`, {
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await updateService();
    } else {
      await createService();
    }
  };

  // Handle edit button click
  const handleEditClick = (service) => {
    setFormData({
      id: service.id,
      serviceName: service.serviceName,
      description: service.description,
      duration: service.duration,
      price: service.price,
      promotion: service.promotion,
      typeService: service.typeService,
    });
    setShowEditForm(true);
  };
  // Reset form and close
  const handleCloseForm = () => {
    setFormData({
      id: null,
      serviceName: '',
      description: '',
      duration: '',
      price: '',
      promotion: '',
      typeService: '',
    });
    setShowAddForm(false);
    setShowEditForm(false);
  };
  const handleAddClick = () => {
    setShowAddForm(true);
    setShowEditForm(false);
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="service-menu-category">
      <div className="service-menu-header-category">
        <button className="add-button" onClick={handleAddClick}>Add</button>
      </div>
      <div className="service-cards-category">
      {services.map((service) => (
        <Link to={`/servicecategory/service`} key={service.CategoryID} className='service-card-link'>
          <div className="service-card-category">
            <h3 className="service-title-category">{service.Name}</h3>
            <p className="service-description"><span className="detail-label">Description:</span> {service.DescriptionShort || 'No description available'}</p>
            <p className="service-typeService"><span className="detail-label">TypeService:</span> {service.TypeService || 'No type available'}</p>
            <div className="service-actions">
              <button onClick={(e) => {
                e.preventDefault();
                handleEditClick(service.CategoryID);
              }}>Edit</button>
              <button onClick={(e) => {
                e.preventDefault();
                deleteService(service.CategoryID);
              }}>Delete</button>
            </div>
          </div>
        </Link>
      ))}
      </div>
      
      {(showAddForm || showEditForm) && (
        <ServiceForm
          isEditing={showEditForm}
          formData={formData}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
        />
      )}
    </div>
  );
};

export default ServiceMenu;
