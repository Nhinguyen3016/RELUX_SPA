import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard/Service-category-dashboard.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { z } from 'zod';

const API_BASE_URL = 'http://localhost:3000/dashboard';

const ServiceCategorySchema = z.object({
  categoryID: z.number().optional(),
  name: z
    .string("Name is required.")
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must not exceed 100 characters."),
  descriptionShort: z
    .string("Short description is required.")
    .min(10, "Short description must be at least 10 characters long.")
    .max(255, "Short description must not exceed 255 characters."),
  typeService: z
    .string("Type of service is required.")
    .min(2, "Type of service must be at least 2 characters long.")
    .max(50, "Type of service must not exceed 50 characters."),
});


const ServiceForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange }) => {
  return (
    <div className="service-form-overlay-dashboard">
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
    categoryID: null,
    name: '',
    descriptionShort: '',
    typeService: '',
  });

  const {enqueueSnackbar}= useSnackbar();

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servicecategory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response.data.data);
      setServices(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching services:', error.response ? error.response.data : error);
      alert(error.response?.data?.message || 'Failed to fetch services');
    }
  };

  const updateService = async (validatedData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/servicecategory/${validatedData.categoryID}`,
        validatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (response.status === 200) {
        await fetchServices();
        handleCloseForm();
        enqueueSnackbar("Service updated successfully!", { variant: "success" });
      }
    } catch (error) {
      console.error("Error updating service:", error);
      enqueueSnackbar("Failed to update service.", { variant: "error" });
    }
  };

  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value  
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const validatedData = ServiceCategorySchema.parse(formData);
  
      if (showEditForm) {
        await updateService(validatedData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          enqueueSnackbar(`${err.message}`, { variant: 'error' });
        });
      } else {
        console.error('Unexpected error:', error);
        enqueueSnackbar('Unexpected error occurred.', { variant: 'error' });
      }
    }
  };
  

  const handleEditClick = (service) => {
    setFormData({
      categoryID: service.CategoryID, 
      name: service.Name,
      descriptionShort: service.DescriptionShort,
      typeService: service.TypeService,
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

  useEffect(() => {
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
                onClick={() => { localStorage.setItem('selectedServiceId', service.CategoryID);}}
            >
              <h3 className="service-title-category">{service.Name}</h3>
              <p className="service-description-dashboard">
                <span className="detail-label">Description Short:</span> {service.DescriptionShort || 'No description short available'}
              </p>
              <p className="service-typeService">
                <span className="detail-label">TypeService:</span> {service.TypeService || 'No typeService available'}
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
