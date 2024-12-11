import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useSnackbar } from 'notistack';
import '../../styles/dashboard/accountList-dashboard.css';

const API_BASE_URL = 'http://localhost:3003/dashboard';

const RoleNameForm = ({ isEditing, formData, onSubmit, onClose, handleInputChange, roleName }) => {
    const roleOptions = roleName.map(role => ({
        value: role.RoleID,
        label: role.RoleName
    }));

    return (
        <div className="role-id-form-overlay">
            <div className="role-id-form-category">
                <h2 className="role-id-form-title">
                    {isEditing ? 'Edit Role ID' : ''}
                </h2>
                <form onSubmit={onSubmit} className="role-id-form">
                    <div className="form-group">
                        <label>Role Name</label>
                        <Select
                            name="roleName"
                            value={roleOptions.find(option => option.label === formData.roleName)}
                            onChange={selectedOption => {
                                handleInputChange({
                                    target: { name: 'roleName', value: selectedOption ? selectedOption.label : '' } 
                                });
                            }}
                            options={roleOptions}
                            isClearable
                            placeholder="Select or type to search"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit">
                            {isEditing ? 'Update Role' : ''}
                        </button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AccountList = () => {
    const [accountList, setAccountList] = useState([]);
    const [roleName, setRoleName] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        userID: null,
        roleName: '',
    });

    const {enqueueSnackbar}= useSnackbar();

    const fetchAccountList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/accountlist`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setAccountList(response.data.accountList);
        } catch (error) {
            console.error('Error fetching AccountList:', error);
            alert('Failed to fetch AccountList');
        }
    };

    const fetchRoleName = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/accountlist/rolename`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
                setRoleName(response.data.roleOptionName);
        } catch (error) {
            console.error('Error fetching Role Names:', error);
            alert('Failed to fetch Role Names');
        }
    };

    const updateUserRole = async (userID, roleName) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/accountlist/${userID}`, {
                userID,
                roleName
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            

            if (response.status === 200) {
                enqueueSnackbar("Role updated successfully!", {variant: 'success'})
                fetchAccountList();
                setShowEditForm(false);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
            enqueueSnackbar("Failed to update user role", {variant: 'error'})
        }
    };
    

    const handleEditClick = (item) => {
        setFormData({
            userID: item.UserID,
            roleName: item.RoleName || '',
        });
        setShowEditForm(true);
    };
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { userID, roleName } = formData;
        if (userID && roleName) {
            updateUserRole(userID, roleName); 
        }
        
    };
    

    const handleCloseForm = () => {
        setFormData({
            userID: null,
            roleName: '',
        });
        setShowEditForm(false);
    };

    useEffect(() => {
        fetchAccountList();
        fetchRoleName();
    }, []);

    return (
        <div className="account-list-container">
            <header className="account-list-header">
                <h2>List Account</h2>
            </header>
            <table className="account-list-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Role Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {accountList.length > 0 ? (
                        accountList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.FullName}</td>
                                <td>{item.Phone}</td>
                                <td className="text">{item.Email}</td>
                                <td className="text">{item.RoleName}</td>
                                <td className="actions">
                                    <button className="action-button-dashboard edit-button-dashboard" onClick={() => handleEditClick(item)}>✏️</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No account data available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showEditForm && (
                <RoleNameForm
                    isEditing={showEditForm}
                    formData={formData}
                    onSubmit={handleSubmit}
                    onClose={handleCloseForm}
                    handleInputChange={handleInputChange}
                    roleName={roleName}
                />
            )}
        </div>
    );
};

export default AccountList;
