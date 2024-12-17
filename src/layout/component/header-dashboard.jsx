import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/dashboard/Header-dashboard.css';

const API_BASE_URL = 'http://localhost:3003/dashboard';

const Header=()=>{
    const navigate = useNavigate();
    const [fullName, setFullName] = useState([]);

    const fetchFullName = async () => {
        try {
            const username = localStorage.getItem('Username'); 

            if (!username) {
                throw new Error("Username not found in localStorage");
            }
    
            const response = await axios.get(`${API_BASE_URL}/fullName/${username}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
                },
            });
    
            if (response.data.fullName && response.data.fullName.length > 0) {
                setFullName(response.data.fullName[0].FullName);  
            } else {
                console.error("FullName not found in response");
                alert('Full name not found.');
            }
    
        } catch (error) {
            console.error('Error fetching full name:', error);
            alert('Failed to fetch full name.');
        }
    };    

    const handleLogout = async () => {
        try {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userRole");
            localStorage.removeItem("Username");
            localStorage.removeItem("selectedServiceId");
            navigate("/");
        } catch (error) {
          console.error("Error during logout:", error);
          alert("Failed to logout. Please try again.");
        }
      };

    useEffect(() => {
        fetchFullName();
    }, []);
    return(
        <header className="header-dashboard">
            <h1 class="hello-dashboard">Hello <span className="fullName">{fullName}</span></h1>
            <div className="search">
                <input type="text" placeholder="Search" className="search-input"/>
                <button type="submit" className="search-button">Search</button>
            </div>
            <button className="btn_logout" onClick={handleLogout}> Logout </button>
        </header>

    );
};
export default Header;
