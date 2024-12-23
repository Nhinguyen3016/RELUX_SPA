import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import '../../styles/dashboard/staff-dashboard.css';
import DeletePopupConfirm from './deletePopupConfirm';


const API_BASE_URL = 'http://localhost:3003/dashboard';

const StaffForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange, handleFileChange, locationNames }) => {
  
  const locationOptions = locationNames.map(locationName => ({
    value: locationName.LocationName,
    label: locationName.LocationName
  }));

  return (
    <div className="staff-form-overlay-dashboard">
      <div className="staff-form-category-dashboard">
        <h2 className="staff-form-title-dashboard">
          {isEditing ? 'Edit Staff' : 'Add New Staff'}
        </h2>
        <button className="close-button-staff-dashboard" onClick={onClose}>×</button>
        <form onSubmit={onSubmit} className="staff-add-from">

        <div className="form-groups">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
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
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Specialty Type</label>
            <input
              type="text"
              name="specialtyType"
              value={formData.specialtyType}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Hire Date</label>
            <input
              type="date"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location Name</label>
            <Select
              name="locationName"
              value={locationOptions.find(option => option.value === formData.name)}
              onChange={selectedOption => handleInputChange({
                target: { name: 'locationName', value: selectedOption ? selectedOption.value : '' }
              })}
              options={locationOptions}
              isClearable
              placeholder="Select or type to search"
            />
          </div>

          <div className="form-groups">
            <label>Avatar</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              placeholder="Enter image avatar"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              {isEditing ? 'Update staff' : 'Add staff'}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StaffList = () => {
  const [employees, setEmployees] = useState([]);
  const [locationNames, setLocationNames] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedEmployeesID, setSelectedEmployeesID] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeID: null,
    name: '',
    description: '',
    phone: '',
    email: '',
    specialtyType: '',
    status: '',
    hireDate: '',
    avatar: '',
    locationName: '',
  });

  const {enqueueSnackbar, closeSnackbar}= useSnackbar();

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

  const fetchLocationName = async () =>{
    try {
      const response = await axios.get(`${API_BASE_URL}/staff/location`, {
        header:{
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setLocationNames(response.data.locationName);
    }catch (error) {
      console.error('Error fetching employees:', error.response?.data || error);
      alert('Failed to fetch employees');
    }
  };
  const createStaff = async () => {


    const formDataToSend = new FormData();
    formDataToSend.append('Name', formData.name.trim());
    formDataToSend.append('Description', formData.description.trim());
    formDataToSend.append('Phone', formData.phone.trim());
    formDataToSend.append('Email', formData.email.trim());
    formDataToSend.append('SpecialtyType', formData.specialtyType.trim());
    formDataToSend.append('Status', formData.status.trim());
    formDataToSend.append('HireDate', formData.hireDate);
    formDataToSend.append('LocationName', formData.locationName.trim()); 

    if (formData.avatar instanceof File) {
      formDataToSend.append('avatar', formData.avatar); 
    } else {
      console.warn('No valid image file provided for image.');
    }

    for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
    }


    const loadingSnackbar = enqueueSnackbar('Creating staff... Please wait.', {
      variant: 'info',
      persist: true,
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/staff`, formDataToSend, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      

      if (response.status === 201) {
        closeSnackbar(loadingSnackbar);
        enqueueSnackbar("Staff created successfully!", { variant: 'success' });
        handleCloseForm();
        fetchEmployees();
      } else {
        enqueueSnackbar("Failed to create Staff. Please try again.", { variant: 'error' });
      }
    } catch (error) {
      closeSnackbar(loadingSnackbar);
      console.error('Error creating Staff:', error.response?.data || error.message);
      enqueueSnackbar(error.response?.data?.message || "Failed to create Staff.", { variant: 'error' });
    }
  };

  const updateStaff = async () => {

      const formDataToSend = new FormData();
      formDataToSend.append('Name', formData.name.trim());
      formDataToSend.append('Description', formData.description.trim());
      formDataToSend.append('Phone', formData.phone.trim());
      formDataToSend.append('Email', formData.email.trim());
      formDataToSend.append('SpecialtyType', formData.specialtyType.trim());
      formDataToSend.append('Status', formData.status.trim());
      formDataToSend.append('LocationName', formData.locationName.trim()); 

      if (formData.avatar instanceof File) {
        formDataToSend.append('avatar', formData.avatar); 
      } else {
        console.warn('No valid image file provided for image.');
      }

      for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
      }
      // Hiển thị thông báo "loading"
      const loadingSnackbar = enqueueSnackbar('Creating staff... Please wait.', {
        variant: 'info',
        persist: true, // Thông báo không tự động đóng
      });
  
    try {
      const response = await axios.put(`${API_BASE_URL}/staff/${formData.employeeID}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  
      if (response.status === 200) {
        closeSnackbar(loadingSnackbar);
        enqueueSnackbar("Staff updated successfully!", {variant: 'success'})
        handleCloseForm();
        fetchEmployees();
      } else {
        enqueueSnackbar("Failed to update Staff. Please try again.", {variant: 'error'})
      }
    } catch (error) {
      closeSnackbar(loadingSnackbar);
      console.error('Error updating Staff:', error);
      enqueueSnackbar("Failed to update Staff", {variant: 'error'})
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log("file:", file);
         setFormData({
            ...formData,
            avatar: file,
          });
      }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const deleteStaff = async (employeeID) => {

    try {
      const response = await axios.delete(`${API_BASE_URL}/staff/${employeeID}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  
      if (response.status === 200) {
        fetchEmployees();
        enqueueSnackbar("Staff deleted successfully!", {variant: 'success'})
        setIsDeletePopupOpen(false);
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      if (error.response && error.response.status === 500) {
        enqueueSnackbar("This staff is currently booked so cannot be deleted.", { variant: 'error' });
      } else {
        enqueueSnackbar("Failed to delete staff.", { variant: 'error' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  formDataToSend.append('Name', formData.name.trim());
  formDataToSend.append('Description', formData.description.trim());
  formDataToSend.append('Phone', formData.phone.trim());
  formDataToSend.append('Email', formData.email.trim());
  formDataToSend.append('SpecialtyType', formData.specialtyType.trim());
  formDataToSend.append('Status', formData.status.trim());
  formDataToSend.append('LocationName', formData.locationName.trim()); 

  if (formData.avatar instanceof File) {
    formDataToSend.append('avatar', formData.avatar); 
  } else {
    console.warn('No valid image file provided for image.');
  }

  for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
  }
    try {
      if (showEditForm) {
        await updateStaff(formDataToSend);
      } else {
        await createStaff(formDataToSend);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar("Error submitting the service form", { variant: 'error' });
    }
  };

  const handleEditClick = (employees) => {
    console.log(employees); // Kiểm tra dữ liệu từ API

    const formattedHireDate = employees.HireDate ? format(new Date(employees.HireDate), 'yyyy-MM-dd') : ''; // Định dạng hireDate
  
    setFormData({
      employeeID: employees.EmployeeID || '',
      name: employees.Name || '',            // Kiểm tra tên trường chính xác ở đây
      description: employees.Description || '',
      phone: employees.Phone || '',
      email: employees.Email || '',
      specialtyType: employees.SpecialtyType || '',
      status: employees.Status || '',
      hireDate: formattedHireDate, // Sử dụng formattedHireDate ở đây
      avatar: employees.avatar || '',
      locationName: employees.LocationName || ''  // Đảm bảo LocationName có trong dữ liệu API
    });
  
    setShowAddForm(false);
    setShowEditForm(true);
  };
  
  const handleAddClick = () => {
    setFormData({
      employeeID: null,
      name: '',
      description: '',
      phone: '',
      email: '',
      specialtyType: '',
      status: '',
      hireDate: '',
      avatar: '',
      locationName: '',
    });
    setShowAddForm(true);  
    setShowEditForm(false); 
  };

  const handleDeleteClick = (employeeID) => {
    setSelectedEmployeesID(employeeID);
    setIsDeletePopupOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (selectedEmployeesID) {
      deleteStaff(selectedEmployeesID);
    }
  };

  const handleClosePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedEmployeesID(null);
  };

  const handleCloseForm = () => {
    setFormData({
      employeeID: null,
      name: '',
      description: '',
      phone: '',
      email: '',
      specialtyType: '',
      status: '',
      hireDate: '',
      avatar: '',
      locationName: '',
    });
    setShowEditForm(false);
    setShowAddForm(false);
  };


  useEffect(() => {
    fetchEmployees();
    fetchLocationName();
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
                <button className="action-button-dashboard delete-button-dashboard" onClick={() => handleDeleteClick(item.EmployeeID)}>🗑️</button>
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
        <StaffForm
          isEditing={showEditForm}
          formData={formData}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          locationNames={locationNames}
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

export default StaffList;
