import React, { useState, useEffect } from 'react';
import '../../styles/dashboard/Service-dashboard.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import DeletePopupConfirm from './deletePopupConfirm';

const API_BASE_URL = 'http://localhost:3003/dashboard';

const ServiceForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange, handleFileChange }) => {
  return (
    <div className="service-form-overlays">
      <div className="service-forms-dashboard">
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
            <label>Image Description</label>
            <input
              type="file"
              name="imageDescription"
              accept="image/*"
              placeholder="Enter image description"
              onChange={handleFileChange}
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
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedServiceID, setSelectedServiceID] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: 0,
    descriptionShort: '',
    duration: 0,
    imageDescription: '',
    categoryId: 0,
    description1: '',
    description2: ''
  });

  const {enqueueSnackbar, closeSnackbar}= useSnackbar();

  useEffect(() => {
    const selectedServiceId = localStorage.getItem('selectedServiceId');
    console.log("Selected Service ID from localStorage:", selectedServiceId);
  
    if (selectedServiceId) {
      const id = Number(selectedServiceId); 
      console.log("Converted ID:", id); 
      if (!isNaN(id) && id > 0) { 
        console.log("Valid Service ID:", id);
        fetchServices(id); 
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
      const response = await axios.get(`${API_BASE_URL}/services/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (Array.isArray(response.data)) {
        const filteredServices = response.data.map(service => ({
          ServiceID: service.ServiceID,
          Name: service.Name,
          Price: service.Price,
          Duration: service.Duration,
          DescriptionShort: service.DescriptionShort,
          Description1: service.Description1,
          Description2: service.Description2,
          ImageDescription: service.ImageDescription
        }));

        console.log("Filtered services:", filteredServices);  // Debug để kiểm tra kết quả
        setServices(filteredServices);  // Cập nhật state với dữ liệu đã lọc
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error.response ? error.response.data : error);
      alert(error.response?.data?.message || 'Failed to fetch services');
    }
};

const createService = async () => {
  const categoryId = Number(localStorage.getItem('selectedServiceId'));
  if (isNaN(categoryId) || categoryId <= 0) {
    enqueueSnackbar("Invalid category ID. Please select a valid category.", { variant: 'error' });
    return;
  }

  if (!formData.name.trim() || formData.price <= 0 || formData.duration <= 0 || !formData.descriptionShort.trim()) {
    enqueueSnackbar("Please fill in all required fields with valid data.", { variant: 'error' });
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name.trim());
  formDataToSend.append('price', Number(formData.price));
  formDataToSend.append('descriptionShort', formData.descriptionShort.trim());
  formDataToSend.append('duration', Number(formData.duration));
  formDataToSend.append('description1', formData.description1?.trim() || '');
  formDataToSend.append('description2', formData.description2?.trim() || '');
  formDataToSend.append('categoryId', Number(categoryId)); 

  if (formData.imageDescription instanceof File) {
    formDataToSend.append('image', formData.imageDescription); 
  } else {
    console.warn('No valid image file provided for image.');
  }

  for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
  }


  const loadingSnackbar = enqueueSnackbar('Creating service... Please wait.', {
    variant: 'info',
    persist: true,
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/services`, formDataToSend, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (response.status === 201) {
      closeSnackbar(loadingSnackbar);
      enqueueSnackbar("Service created successfully!", { variant: 'success' });
      handleCloseForm();
      fetchServices(categoryId);
    } else {
      enqueueSnackbar("Failed to create service. Please try again.", { variant: 'error' });
    }
  } catch (error) {
    closeSnackbar(loadingSnackbar);
    console.error('Error creating service:', error.response?.data || error.message);
    enqueueSnackbar(error.response?.data?.message || "Failed to create service.", { variant: 'error' });
  }
};
const updateService = async () => {

  const categoryId = Number(localStorage.getItem('selectedServiceId'));
  console.log("categoryId from localStorage:", categoryId); 

  if (isNaN(categoryId) || categoryId <= 0) {
    alert("Invalid category ID. Please select a valid category.");
    return;
  }

  if (!formData.id) {
    alert("Service ID is missing. Please try again.");
    console.error("Service ID không hợp lệ:", formData.id);
    return;
  }
  
  if (!formData.name || !formData.price || !formData.descriptionShort || !formData.duration) {
    alert("Please fill all required fields.");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name.trim());
  formDataToSend.append('price', Number(formData.price));
  formDataToSend.append('descriptionShort', formData.descriptionShort.trim());
  formDataToSend.append('duration', Number(formData.duration));
  formDataToSend.append('description1', formData.description1?.trim() || '');
  formDataToSend.append('description2', formData.description2?.trim() || '');
  formDataToSend.append('categoryId', Number(categoryId)); 

  if (formData.imageDescription instanceof File) {
    formDataToSend.append('image', formData.imageDescription); 
  } else {
    console.warn('No valid image file provided for image.');
  }

    // Hiển thị thông báo "loading"
    const loadingSnackbar = enqueueSnackbar('Creating service... Please wait.', {
      variant: 'info',
      persist: true, // Thông báo không tự động đóng
    });

  try {
    const response = await axios.put(`${API_BASE_URL}/services/${formData.id}`, formDataToSend, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    

    if (response.status === 200) {
      closeSnackbar(loadingSnackbar);
      const selectedServiceId = localStorage.getItem('selectedServiceId');
      if (selectedServiceId) {
        const id = Number(selectedServiceId);
        if (!isNaN(id) && id > 0) {
          await fetchServices(id); // Gọi lại hàm fetchServices với ID hợp lệ
        } else {
          console.error('Invalid service ID after update:', selectedServiceId);
        }
      } else {
        console.log('No service ID found in localStorage after update');
      }
      handleCloseForm();
      enqueueSnackbar("Service updated successfully!", {variant: 'success'})
    } else {
      enqueueSnackbar("Failed to update service. Please try again.", {variant: 'error'})
    }
  } catch (error) {
    closeSnackbar(loadingSnackbar);
    console.error('Error updating service:', error);
    enqueueSnackbar("Failed to update service", {variant: 'error'})
  }
};

const deleteService = async (serviceID) => {

  try {
    const response = await axios.delete(`${API_BASE_URL}/services/${serviceID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (response.status === 200) {
      const selectedServiceId = localStorage.getItem('selectedServiceId');
      if (selectedServiceId) {
        const id = Number(selectedServiceId);
        if (!isNaN(id) && id > 0) {
          await fetchServices(id);
        } else {
          console.error('Invalid service ID after deletion:', selectedServiceId);
        }
      } else {
        console.log('No service ID found in localStorage after deletion');
      }
      enqueueSnackbar("Service deleted successfully!", {variant: 'success'})
      setIsDeletePopupOpen(false);
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    if (error.response && error.response.status === 500) {
      enqueueSnackbar("This service is currently booked so cannot be deleted.", { variant: 'error' });
    } else {
      enqueueSnackbar("Failed to delete service.", { variant: 'error' });
    }
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('price', formData.price);
  formDataToSend.append('descriptionShort', formData.descriptionShort);
  formDataToSend.append('duration', formData.duration);
  formDataToSend.append('description1', formData.description1);
  formDataToSend.append('description2', formData.description2);
  formDataToSend.append('categoryId', formData.categoryId);

  if (formData.imageDescription) {
    formDataToSend.append('image', formData.imageDescription);
  }
  for (let [key, value] of formDataToSend.entries()) {
    console.log(key, value);
  }
  try {
    if (showEditForm) {
      await updateService(formDataToSend);
    } else {
      await createService(formDataToSend);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    enqueueSnackbar("Error submitting the service form", { variant: 'error' });
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
    id: prevFormData.id,
  }));
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
      console.log("file:", file);
       setFormData({
          ...formData,
          imageDescription: file,
        });
    }
};

const handleEditClick = (service) => {
  console.log("Chỉnh sửa dịch vụ:", service); 
  console.log("Service ID:", service.id); 
  console.log("Tất cả các thuộc tính của service:", service); // Kiểm tra tất cả các thuộc tính

  setFormData({
    ...formData,
    id: service.ServiceID,
    name: service.Name || '',
    price: service.Price || 0,
    descriptionShort: service.DescriptionShort || '',
    duration: service.Duration || 0,
    imageDescription: service.ImageDescription || '',
    categoryId: service.CategoryID || 0,
    description1: service.Description1 || '',
    description2: service.Description2 || ''
  });
  
  console.log("Đối tượng dịch vụ để chỉnh sửa:", service);
  setShowEditForm(true);
};

const handleAddClick = () => {
  setFormData({
  id: null,
  name: '',
  price: '',
  descriptionShort: '',
  duration: '',
  imageDescription: null,
  categoryId: '',
  description1: '',
  description2: ''
  });
  setShowAddForm(true);
  setShowEditForm(false);
};

const handleDeleteClick = (serviceID) => {
  setSelectedServiceID(serviceID);
  setIsDeletePopupOpen(true);
};

const handleConfirmDelete = () => {
  if (selectedServiceID) {
    deleteService(selectedServiceID);
  }
};
const handleClosePopup = () => {
  setIsDeletePopupOpen(false);
  setSelectedServiceID(null);
};

const handleCloseForm = () => {
  setFormData({
    id: null,
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


  return (
    <div className="service-menu">
      <div className="service-menu-header">
        <button className="add-button" onClick={handleAddClick}>Add</button>
      </div>
      <div className="service-small">
         {Array.isArray(services) && services.length > 0 ? (
           services.map((service) => (
          <div
           key={service.ServiceID} 
           className="service-card1"
           >
              <h3 className="service-title-category">{service.Name}</h3>
              <div className="service-details">
                <p><span className="detail-label1">Duration:</span> {service.Duration} mins</p>
                <p><span className="detail-label1">Price:</span> ${service.Price}</p>
                <p className="service-description-dashboard"><span className="detail-label1">Description Short:</span> {service.DescriptionShort}</p>
              </div>
              <div className="service-actions">
              <button onClick={(e) => {
                e.preventDefault();
                handleEditClick(service);
              }}>Edit</button>
              <button onClick={(e) => {
                e.preventDefault();
                handleDeleteClick(service.ServiceID);
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
          handleFileChange={handleFileChange}
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

export default ServicePackage;
