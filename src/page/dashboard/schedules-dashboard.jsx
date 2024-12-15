import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useSnackbar } from 'notistack';
import { z } from 'zod';
import '../../styles/dashboard/schedules-dashboard.css';
import DeletePopupConfirm from './deletePopupConfirm';

const API_BASE_URL = 'http://localhost:3003/dashboard';

const schedulesSchema = z.object({
  name: z.string().nonempty('Employee name is required'),
  daysOfWeek: z.array(z.string()).min(1, 'At least one day must be selected'),
  startTime: z.string().nonempty('Start time is required'),
  endTime: z.string().nonempty('End time is required'),
});

const SchedulesForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange, employees }) => {
  console.log('Form Data in SchedulesForm:', formData);
  
  // Tạo danh sách các tùy chọn cho react-select
  const employeeOptions = employees.map(employee => ({
    value: employee.EmployeeName,
    label: employee.EmployeeName
  }));

  return (
    <div className="schedules-form-overlay">
      <div className="schedules-form-category">
        <h2 className="schedules-form-title">
          {isEditing ? 'Edit schedules' : 'Add New schedules'}
        </h2>
        <button className="close-button-schedules" onClick={onClose}>×</button>
        <form onSubmit={onSubmit} className="schedules-add-from">
          <div className="form-group">
            <label>Employee</label>
            <Select
              name="name"
              value={employeeOptions.find(option => option.value === formData.name)}
              onChange={selectedOption => handleInputChange({
                target: { name: 'name', value: selectedOption ? selectedOption.value : '' }
              })}
              options={employeeOptions}
              isClearable
              placeholder="Select or type to search"
            />
          </div>

          <div className="form-group">
            <label>Select Days</label>
            <div className="select-days-container">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name="daysOfWeek"
                    value={day}
                    checked={formData.daysOfWeek.includes(day)}
                    onChange={handleInputChange}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              {isEditing ? 'Update schedules' : 'Add schedules'}
            </button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SchedulesMenu = () => {
  const [schedules, setSchedules] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); 
  const [selectedWorkScheduleID, setSelectedWorkScheduleID] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    daysOfWeek: [],
    startTime: '',
    endTime: ''
  });

  const {enqueueSnackbar}= useSnackbar();

  const formatDayOfWeek = (dayOfWeek) => {
    if (!dayOfWeek) return 'N/A';
    if (Array.isArray(dayOfWeek)) {
      return dayOfWeek.join(', '); // Kết hợp các ngày bằng dấu phẩy
    }
    return typeof dayOfWeek === 'string' ? dayOfWeek : 'N/A';
  };


  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/schedules`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      console.log('Raw API Response:', response.data);

      const processedSchedules = response.data.schedules.map(item => ({
        ...item,
        DayOfWeek: item.DayOfWeek 
          ? (typeof item.DayOfWeek === 'string' 
              ? item.DayOfWeek.split(',') 
              : item.DayOfWeek)
          : []
      }));
      
      console.log('Processed schedules Data:', processedSchedules);
      setSchedules(processedSchedules || []);
    } catch (error) {
      console.error('Error fetching schedules:', error.response?.data || error);
      alert('Failed to fetch schedules list');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/schedules/employees`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setEmployees(response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees list');
    }
  };



  const createStaffSchedules = async () => {
    try {
        console.log('Creating schedules with days:', formData.daysOfWeek);
        
        const schedules = [{
            name: formData.name,
            dayOfWeek: formData.daysOfWeek.join(','),
            startTime: formData.startTime + ':00',
            endTime: formData.endTime + ':00'
        }];

        console.log('Schedules to be created:', schedules);

        const response = await axios.post(`${API_BASE_URL}/schedules`,
            { schedules },  // Gửi mảng schedules
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            }
        );

        if (response.status === 201) {
            await fetchStaff();
            handleCloseForm();
            enqueueSnackbar("Schedules created successfully!", {variant: 'success'})
        }
    } catch (error) {
        console.error('Error creating schedules:', error);
        enqueueSnackbar("Failed to create schedules", {variant: 'error'})
    }
  };

  const updateStaffSchedules = async () => {
    try {
        const response = await axios.put(`${API_BASE_URL}/schedules/${formData.workScheduleID}`,
            {
                schedules: [{
                    name: formData.name,
                    dayOfWeek: formData.daysOfWeek.join(','),
                    startTime: formData.startTime,
                    endTime: formData.endTime
                }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            await fetchStaff();
            handleCloseForm();
            enqueueSnackbar("Schedules updated successfully!", {variant: 'success'})
        }
    } catch (error) {
        console.error('Error updating schedules:', error);
        enqueueSnackbar("Failed to update schedules", {variant: 'error'})
    }
  };

  const deleteStaffSchedule = async (workScheduleID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/schedules/${workScheduleID}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            }
        );
        
        if (response.status === 200) {
            await fetchStaff();
            enqueueSnackbar("Schedules deleted successfully!", {variant: 'success'})
        }
    } catch (error) {
        console.error('Error deleting schedules schedule:', error);
        enqueueSnackbar("Failed to delete schedules", {variant: 'error'})
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === "daysOfWeek") {
      setFormData(prevState => {
        // Nếu checkbox được chọn, thêm giá trị vào mảng
        const updatedDays = checked
          ? [...prevState.daysOfWeek, value]
          : prevState.daysOfWeek.filter(day => day !== value); // Nếu bỏ chọn, loại bỏ giá trị khỏi mảng
          console.log("Updated Days:", updatedDays); // Debug giá trị cập nhật
        return {
          ...prevState,
          daysOfWeek: updatedDays, // Cập nhật mảng daysOfWeek
        };
      });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value, // Cập nhật các trường khác (name, startTime, endTime)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data với zod
      schedulesSchema.parse(formData);

      if (showEditForm) {
        await updateStaffSchedules();
      } else {
        await createStaffSchedules();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        enqueueSnackbar(error.errors[0].message, { variant: 'error' });
      } else {
        console.error('Unexpected error:', error);
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
      }
    }
  };

  const handleEditClick = (staffMember) => {
    setFormData({
      workScheduleID: staffMember.WorkScheduleID,
      name: staffMember.EmployeesName,
      daysOfWeek: Array.isArray(staffMember.DayOfWeek) 
        ? staffMember.DayOfWeek 
        : staffMember.DayOfWeek ? staffMember.DayOfWeek.split(',') : [],
      startTime: staffMember.StartTime.slice(0, 5),
      endTime: staffMember.EndTime.slice(0, 5)
    });
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setFormData({
      id: null,
      name: '',
      daysOfWeek: [],
      startTime: '',
      endTime: ''
    });
    setShowAddForm(true);  
    setShowEditForm(false); 
  };

  const handleDeleteClick = (workScheduleID) => {
    setSelectedWorkScheduleID(workScheduleID); 
    setIsDeletePopupOpen(true); 
  };

  const handleConfirmDelete = () => {
    if (selectedWorkScheduleID) {
      deleteStaffSchedule(selectedWorkScheduleID);
    }
  };
  const handleClosePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedWorkScheduleID(null);
  };

  const handleCloseForm = () => {
    setFormData({
      id: null,
      name: '',
      daysOfWeek: [],
      startTime: '',
      endTime: ''
    });
    setShowEditForm(false);
    setShowAddForm(false);
  };

  useEffect(() => {
    fetchEmployees();
    fetchStaff();
  }, []);
  return (
    <div className="schedules-menu">
      <div className="schedules-menu-header">
        <h2 className="title">Schedules List</h2>
        <div className="button-header">
          <button onClick={handleAddClick}>Add</button>
        </div>
      </div>

      <table className="schedules-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Day of Week</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.EmployeesName || item.name || 'N/A'}</td>
                  <td>{formatDayOfWeek(item.DayOfWeek)}</td>
                  <td>{item.StartTime || 'N/A'}</td>
                  <td>{item.EndTime || 'N/A'}</td>
                  <td className="actions">
                    <button className="action-button-dashboard edit-button-dashboard" onClick={() => handleEditClick(item)}>✏️</button>
                    <button className="action-button-dashboard delete-button-dashboard" onClick={() => handleDeleteClick(item.WorkScheduleID)}>🗑️</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No schedules data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {(showAddForm || showEditForm) && (
        <SchedulesForm
          isEditing={showEditForm}
          formData={formData}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          handleInputChange={handleInputChange}
          employees={employees}
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

export default SchedulesMenu;
