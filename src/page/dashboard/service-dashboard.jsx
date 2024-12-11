import React, { useState, useEffect } from 'react';
import '../../styles/dashboard/Service-dashboard.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3003/dashboard';

const ServiceForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange }) => {
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
    id: null,
    name: '',
    price: 0,
    descriptionShort: '',
    duration: 0,
    imageDescription: '',
    categoryId: 0,
    description1: '',
    description2: '',
    imageMain: ''
  });

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
          ImageDescription: service.ImageDescription,
          ImageMain: service.ImageMain
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
  try {
    const categoryId =Number(localStorage.getItem('selectedServiceId')) ; 

    const response = await axios.post(`${API_BASE_URL}/services`, {
      name: formData.name,
      price: Number(formData.price),
      descriptionShort: formData.descriptionShort,
      duration: Number(formData.duration),
      imageDescription: formData.imageDescription,
      categoryId: categoryId,
      description1: formData.description1,
      description2: formData.description2,
      imageMain: formData.imageMain
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
  
  console.log("formData trước khi update:", formData);

  if (!formData.id) {
    alert("Service ID is missing. Please try again.");
    console.error("Service ID không hợp lệ:", formData.id);
    return;
  }
  
  if (!formData.name || !formData.price || !formData.descriptionShort || !formData.duration) {
    alert("Please fill all required fields.");
    return;
  }

  const categoryId = Number(localStorage.getItem('selectedServiceId'));
  console.log("categoryId from localStorage:", categoryId); 

  if (isNaN(categoryId) || categoryId <= 0) {
    alert("Invalid category ID. Please select a valid category.");
    return;
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/services/${formData.id}`, {
      name: formData.name,
      price: Number(formData.price),
      descriptionShort: formData.descriptionShort,
      duration: Number(formData.duration),
      imageDescription: formData.imageDescription,
      categoryId: categoryId, 
      description1: formData.description1,
      description2: formData.description2,
      imageMain: formData.imageMain
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (response.status === 200) {
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
      alert('Service updated successfully!');
    } else {
      alert('Failed to update service. Please try again.');
    }
  } catch (error) {
    console.error('Error updating service:', error);

    if (error.response) {
      console.error('Error response:', error.response);
      alert(error.response.data.message || 'An error occurred while updating the service.');
    } else {
      alert('Failed to update service due to network error.');
    }
  }
};

const deleteService = async (serviceID) => {
  if (!window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
    return;
  }
  console.log("serviceID", serviceID);

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

      alert('Service deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    alert(error?.response?.data?.message || 'Failed to delete service');
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("formData trong handleSubmit:", formData); // Kiểm tra xem formData có chứa serviceId không
  
  if (showEditForm && !formData.id) {
    alert("Mã dịch vụ bị thiếu. Vui lòng thử lại.");
    return; // Nếu serviceId thiếu thì không tiếp tục
  }
  
  if (showEditForm) {
    await updateService(); // Gọi cập nhật
  } else {
    await createService(); // Gọi tạo mới
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
    description2: service.Description2 || '',
    imageMain: service.ImageMain || ''
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
  categoryId: null,
  description1: null,
  description2: null,
  imageMain: null
  });
  setShowAddForm(true);
  setShowEditForm(false);
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
                deleteService(service.ServiceID);
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
