import React, { useState, useEffect } from 'react';
import '../../styles/dashboard/schedules-dashboard.css';
import axios from 'axios';
import Select from 'react-select';

const API_BASE_URL = 'http://localhost:3003/dashboard';

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
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    daysOfWeek: [],
    startTime: '',
    endTime: ''
  });

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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      const response = await axios.get(`${API_BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployees(response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees list');
    }
  };



  const createStaff = async () => {
    try {
        console.log('Creating schedules with days:', formData.daysOfWeek);
        
        // Tạo một schedule object duy nhất với dayOfWeek là chuỗi các ngày
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
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        if (response.status === 201) {
            await fetchStaff();
            handleCloseForm();
            alert('schedules created successfully!');
        }
    } catch (error) {
        console.error('Error creating schedules:', error);
        alert(error.response?.data?.message || 'Failed to create schedules');
    }
  };

  const updateStaff = async () => {
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            await fetchStaff();
            handleCloseForm();
            alert('schedules updated successfully!');
        }
    } catch (error) {
        console.error('Error updating schedules:', error);
        alert(error.response?.data?.message || 'Failed to update schedules');
    }
  };

  const deleteStaffSchedule = async (workScheduleID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/schedules/${workScheduleID}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        
        if (response.status === 200) {
            await fetchStaff();
            alert('schedules schedule deleted successfully!');
        }
    } catch (error) {
        console.error('Error deleting schedules schedule:', error);
        alert(error.response?.data?.message || 'Failed to delete schedules schedule');
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
    console.log('Form Data being submitted:', formData);

    if (!formData.name || formData.daysOfWeek.length === 0 || !formData.startTime || !formData.endTime) {
      alert('Please fill all required fields');
      return;
    }

    try {
      if (showEditForm) {  // Nếu đang edit
        await updateStaff();
      } else {  // Nếu đang add
        await createStaff();
      }
    } catch (error) {
      console.error('Error handling schedules:', error);
      alert(error.message || 'An error occurred');
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
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWV0Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzMzAwMjUyLCJleHAiOjE3MzM5MDUwNTJ9.7_1lF0-Zlyw9H2Wiw_rWrFD6OPkIu1egTTPuHhifm0k'
    );
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
                    <button onClick={() => handleEditClick(item)}>✏️</button>
                    <button onClick={() => deleteStaffSchedule(item.WorkScheduleID)}>🗑️</button>
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
    </div>
  );
};

export default SchedulesMenu;
